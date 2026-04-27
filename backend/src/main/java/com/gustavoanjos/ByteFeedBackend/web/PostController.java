package com.gustavoanjos.ByteFeedBackend.web;

import com.gustavoanjos.ByteFeedBackend.domain.Post;
import com.gustavoanjos.ByteFeedBackend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post savedPost = postRepository.save(post);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        postRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/like")
    public ResponseEntity<Post> toggleLike(@PathVariable Long id, @RequestParam(defaultValue = "true") boolean isLiked) {
        return postRepository.findById(id).map(post -> {
            // Very simplified logic: in a real app, this is tracked per user
            if (isLiked) {
                post.setLikes(post.getLikes() + 1);
            } else {
                post.setLikes(Math.max(0, post.getLikes() - 1));
            }
            return ResponseEntity.ok(postRepository.save(post));
        }).orElse(ResponseEntity.notFound().build());
    }
}
