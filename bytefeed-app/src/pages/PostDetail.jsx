import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { usePosts } from "../PostContext";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts } = usePosts();
  
  const post = posts.find(p => p.id === parseInt(id));
  
  const [comments, setComments] = useState([
    { id: 1, authorName: "Tech News", authorHandle: "technews", time: "10m", content: "Great post!", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ6C4cFUD9rMh-kHpKWmBZNjGX9cixnvCUUOTASvN7fQ-_TWm9eFSFDGyqs5b5xiD_VJPiWuobXOOWzN0H5_iJxGp8Z5bjAJsD06cGP6j-8ASY9s3vT18ZdGYdNaIRNXDfG0epauNO6hdbSEqhIDYX2ublt_k7CP6bl-kF3hwoYMYzx95A3bBzu0MY_F2wmYJQMx5Klmk8xImpnMdRCgJWJaRNuTyw8BytOSHfYEK6M3p9gAv2F-XUOONYjB71-IJYMiq5C6U92wpy" },
    { id: 2, authorName: "Jordan Smith", authorHandle: "jsmith", time: "5m", content: "Totally agree with this.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoVYuDQxV7aOIo7IoOz8LHaDkKkkDYbypQru07ygFFT8FF6e6tyVjFwKyW_vmlCn0UrV_WpBAHmQKNnNld6auoeqLb66iWmlMknLfANzK79-ntqOrIGZUhf0RKLAo9WpKzhdI1jweM7i_ERUT-jBG2haJ5fRaJK08E319W4-nWuBKDahAhW-xDEtUXV2o8LkHxbv1hVoMTEq4p7_n9emTAS9IWr3ObL0rdrpOn_WLXq92NsiXnZ0uj6xn2KuyJ3zW5xtjsqEY692c-" }
  ]);
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return <div className="p-8 text-center">Post not found. <Link to="/feed" className="text-primary">Go back</Link></div>;
  }

  const handleReply = () => {
    if (newComment.trim()) {
      setComments([{
        id: Date.now(),
        authorName: "Me",
        authorHandle: "my_handle",
        time: "just now",
        content: newComment,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfTEVI-kwqn07qibiCe8faZpobwkfd_u2kgdwJR13SHl4H_z2Wnwl_39GndEYZLcfF0HRP1w0G5vfT7Kosm9yD-ba3rULpTaw5vUQqVVwuSrFuVKBYMu_wMr0Vn3EI6Xg8rb8_Hb0ccMGmNPatfld84wsaGoMO7GLBsqdvUbdaU6T-rdFILqb25GGeZxmwaI2-P6J7mDk3xyjAwvd8GDo1Mnw5snkTh1Yh49C6wOGPyvlvHQwnRVtuJmW7hEdxvxtmanUK8ltUeBO8"
      }, ...comments]);
      setNewComment("");
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
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={post.avatar} alt={post.authorName} />
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <span className="font-bold text-on-surface text-lg">{post.authorName}</span>
              <span className="text-on-surface-variant text-sm">@{post.authorHandle}</span>
            </div>
          </div>
          <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-2 rounded-full h-fit">more_horiz</button>
        </div>
        <p className="text-on-surface mt-4 text-xl leading-relaxed">
          {post.content}
        </p>
        <div className="text-on-surface-variant text-sm mt-4 pb-4 border-b border-outline-variant/10">
          {post.time}
        </div>
      </div>

      {/* Add Comment Area */}
      <section className="p-4 border-b border-outline-variant/10 flex gap-4 items-start bg-surface-container-lowest">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfTEVI-kwqn07qibiCe8faZpobwkfd_u2kgdwJR13SHl4H_z2Wnwl_39GndEYZLcfF0HRP1w0G5vfT7Kosm9yD-ba3rULpTaw5vUQqVVwuSrFuVKBYMu_wMr0Vn3EI6Xg8rb8_Hb0ccMGmNPatfld84wsaGoMO7GLBsqdvUbdaU6T-rdFILqb25GGeZxmwaI2-P6J7mDk3xyjAwvd8GDo1Mnw5snkTh1Yh49C6wOGPyvlvHQwnRVtuJmW7hEdxvxtmanUK8ltUeBO8" alt="Me" />
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
              className="bg-primary-container text-on-primary px-4 py-1.5 rounded-full font-semibold transition-all active:scale-95 hover:opacity-90 disabled:opacity-50"
            >
              Reply
            </button>
          </div>
        </div>
      </section>

      {/* Comments List */}
      <div className="flex flex-col">
        {comments.map(comment => (
          <article key={comment.id} className="p-6 hover:bg-surface-container-low/30 transition-colors border-b border-outline-variant/10">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src={comment.avatar} alt={comment.authorName} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-on-surface">{comment.authorName}</span>
                  <span className="text-on-surface-variant text-sm font-normal">@{comment.authorHandle}</span>
                  <span className="text-on-surface-variant text-xs mx-1">•</span>
                  <span className="text-on-surface-variant text-xs">{comment.time}</span>
                </div>
                <p className="text-on-surface mt-1">
                  {comment.content}
                </p>
                <div className="flex justify-start gap-8 mt-3 text-on-surface-variant">
                  <button className="flex items-center gap-2 group">
                    <span className="material-symbols-outlined text-[18px] group-hover:text-red-500 transition-colors">favorite</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
