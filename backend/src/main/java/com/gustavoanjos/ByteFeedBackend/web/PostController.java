package com.gustavoanjos.ByteFeedBackend.web;

import com.gustavoanjos.ByteFeedBackend.domain.Comment;
import com.gustavoanjos.ByteFeedBackend.domain.Post;
import com.gustavoanjos.ByteFeedBackend.domain.User;
import com.gustavoanjos.ByteFeedBackend.repository.CommentRepository;
import com.gustavoanjos.ByteFeedBackend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    /**
     * Cria um post. O autor é extraído do token JWT — o frontend só envia o content.
     */
    @PostMapping
    public ResponseEntity<Post> createPost(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal User currentUser
    ) {
        Post post = Post.builder()
                .content(body.get("content"))
                .authorName(currentUser.getName())
                .authorHandle(currentUser.getHandle())
                .avatar(currentUser.getAvatarUrl())
                .comments(0)
                .retweets(0)
                .likes(0)
                .build();

        return new ResponseEntity<>(postRepository.save(post), HttpStatus.CREATED);
    }

    /**
     * Deleta um post. Apenas o autor pode deletar o próprio post.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        return postRepository.findById(id).map(post -> {
            if (!post.getAuthorHandle().equals(currentUser.getHandle())) {
                return ResponseEntity.<Void>status(HttpStatus.FORBIDDEN).build();
            }
            postRepository.deleteById(id);
            return ResponseEntity.<Void>noContent().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/like")
    public ResponseEntity<Post> toggleLike(
            @PathVariable Long id,
            @RequestParam(defaultValue = "true") boolean isLiked
    ) {
        return postRepository.findById(id).map(post -> {
            if (isLiked) {
                post.setLikes(post.getLikes() + 1);
            } else {
                post.setLikes(Math.max(0, post.getLikes() - 1));
            }
            return ResponseEntity.ok(postRepository.save(post));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long id) {
        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(commentRepository.findByPostIdOrderByCreatedAtDesc(id));
    }

    /**
     * Adiciona um comentário. Autor extraído do token JWT.
     */
    @PostMapping("/{id}/comments")
    public ResponseEntity<Comment> addCommentToPost(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal User currentUser
    ) {
        return postRepository.findById(id).map(post -> {
            Comment comment = new Comment();
            comment.setPost(post);
            comment.setContent(body.get("content"));
            comment.setAuthorName(currentUser.getName());
            comment.setAuthorHandle(currentUser.getHandle());
            comment.setAvatar(currentUser.getAvatarUrl());

            Comment savedComment = commentRepository.save(comment);

            post.setComments(post.getComments() + 1);
            postRepository.save(post);

            return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
        }).orElse(ResponseEntity.notFound().build());
    }
}
