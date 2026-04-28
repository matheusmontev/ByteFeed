import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { usePosts } from "../PostContext";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, currentUser, formatTime, setPosts } = usePosts();
  
  const post = posts.find(p => p.id === parseInt(id));
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (post) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}/comments`)
        .then(res => res.json())
        .then(data => {
          setComments(data.map(c => ({...c, time: formatTime(c.createdAt)})));
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to load comments", err);
          setIsLoading(false);
        });
    }
  }, [id, post, formatTime]);

  if (!post) {
    return <div className="p-8 text-center">Post not found. <Link to="/feed" className="text-primary">Go back</Link></div>;
  }

  const handleReply = () => {
    if (newComment.trim()) {
      const commentData = {
        authorName: currentUser.name,
        authorHandle: currentUser.handle,
        content: newComment,
        avatar: currentUser.avatar
      };

      fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
      })
        .then(res => {
          if (!res.ok) throw new Error(`Server responded with ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log("Comment posted successfully:", data);
          setComments([{...data, time: formatTime(data.createdAt)}, ...comments]);
          setNewComment("");
          // Update parent post comment count locally
          setPosts(prevPosts => prevPosts.map(p => {
             if (p.id === parseInt(id)) {
                 return { ...p, comments: (p.comments || 0) + 1 };
             }
             return p;
          }));
        })
        .catch(err => {
          console.error("Failed to post comment:", err);
          alert("Failed to post comment. Please check if the backend is running.");
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-surface-container-lowest min-h-screen border-l border-r border-outline-variant/20 relative">
      <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 px-4 py-3 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container transition-all">
          arrow_back
        </button>
        <h1 className="text-xl font-bold text-on-surface">Post</h1>
      </header>

      {/* Main Post */}
      <div className="p-6 border-b border-outline-variant/10">
        <div className="flex gap-4">
          <Link to={`/profile/${post.authorHandle}`}>
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src={post.avatar} alt={post.authorName} />
            </div>
          </Link>
          <div className="flex-1">
            <div className="flex flex-col">
              <Link to={`/profile/${post.authorHandle}`} className="font-bold text-on-surface text-lg hover:underline">{post.authorName}</Link>
              <span className="text-on-surface-variant text-sm">@{post.authorHandle}</span>
            </div>
          </div>
          <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-2 rounded-full h-fit">more_horiz</button>
        </div>
        <p className="text-on-surface mt-4 text-xl leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
        <div className="text-on-surface-variant text-sm mt-4 pb-4 border-b border-outline-variant/10">
          {post.time}
        </div>
      </div>

      {/* Add Comment Area */}
      <section className="p-4 border-b border-outline-variant/10 flex gap-4 items-start bg-surface-container-lowest">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-surface-container">
          <img className="w-full h-full object-cover" src={currentUser.avatar} alt={currentUser.name} />
        </div>
        <div className="flex-1 flex flex-col">
          <textarea 
            className="w-full border-none focus:ring-0 text-lg placeholder:text-on-surface-variant/50 resize-none bg-transparent text-on-surface focus:outline-none" 
            placeholder="Post your reply..." 
            rows="2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button 
              onClick={handleReply}
              disabled={!newComment.trim()}
              className="bg-gradient-to-br from-primary-container to-primary text-on-primary px-5 py-1.5 rounded-full font-semibold transition-all active:scale-95 hover:opacity-90 disabled:opacity-50"
            >
              Reply
            </button>
          </div>
        </div>
      </section>

      {/* Comments List */}
      <div className="flex flex-col pb-10">
        {isLoading ? (
          <div className="p-8 text-center text-on-surface-variant">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <article key={comment.id} className="p-6 hover:bg-surface-container-low/30 transition-colors border-b border-outline-variant/10">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Link to={`/profile/${comment.authorHandle}`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                      <img className="w-full h-full object-cover" src={comment.avatar} alt={comment.authorName} />
                    </div>
                  </Link>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 flex-wrap">
                    <Link to={`/profile/${comment.authorHandle}`} className="font-bold text-on-surface hover:underline">{comment.authorName}</Link>
                    <span className="text-on-surface-variant text-sm font-normal">@{comment.authorHandle}</span>
                    <span className="text-on-surface-variant text-xs mx-1">•</span>
                    <span className="text-on-surface-variant text-xs">{comment.time}</span>
                  </div>
                  <p className="text-on-surface mt-1 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                  <div className="flex justify-start gap-8 mt-3 text-on-surface-variant">
                    <button className="flex items-center gap-2 group">
                      <span className="material-symbols-outlined text-[18px] group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors p-1.5 rounded-full">favorite</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="p-8 text-center text-on-surface-variant">No replies yet. Be the first!</div>
        )}
      </div>
    </div>
  );
}
