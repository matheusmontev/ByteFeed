import { Link } from "react-router-dom";
import { usePosts } from "../PostContext";

export default function PostCard({ post }) {
  const { toggleLike, deletePost } = usePosts();

  return (
    <article className="p-6 hover:bg-surface-container-low/30 transition-colors cursor-pointer border-b border-outline-variant/10">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Link to={`/profile/${post.authorHandle}`}>
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src={post.avatar} alt={post.authorName} />
            </div>
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Link to={`/profile/${post.authorHandle}`} className="font-bold text-on-surface hover:underline">
                {post.authorName}
              </Link>
              <span className="text-on-surface-variant text-sm font-normal">@{post.authorHandle}</span>
              <span className="text-on-surface-variant text-xs mx-1">•</span>
              <span className="text-on-surface-variant text-xs">{post.time}</span>
            </div>
            <button className="material-symbols-outlined text-on-surface-variant text-sm hover:bg-surface-container p-1 rounded-full">more_horiz</button>
          </div>
          
          <Link to={`/post/${post.id}`}>
            <p className="text-on-surface mt-2 leading-relaxed">
              {post.content}
            </p>
          </Link>
          
          <div className="flex justify-between max-w-sm mt-4 text-on-surface-variant">
            <button className="flex items-center gap-2 group">
              <span className="material-symbols-outlined text-[20px] group-hover:bg-[#1d9bf0]/10 group-hover:text-primary-container p-2 rounded-full transition-all">chat_bubble</span>
              <span className="text-xs group-hover:text-primary-container">{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 group">
              <span className="material-symbols-outlined text-[20px] group-hover:bg-green-500/10 group-hover:text-green-500 p-2 rounded-full transition-all">autorenew</span>
              <span className="text-xs group-hover:text-green-500">{post.retweets}</span>
            </button>
            <button 
              className={`flex items-center gap-2 group ${post.isLiked ? 'text-red-500' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                toggleLike(post.id);
              }}
            >
              <span 
                className="material-symbols-outlined text-[20px] group-hover:bg-red-500/10 group-hover:text-red-500 p-2 rounded-full transition-all"
                style={post.isLiked ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                favorite
              </span>
              <span className={`text-xs ${post.isLiked ? '' : 'group-hover:text-red-500'}`}>{post.likes}</span>
            </button>
            <button 
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                deletePost(post.id);
              }}
            >
              <span className="material-symbols-outlined text-[20px] group-hover:bg-red-500/10 group-hover:text-red-500 p-2 rounded-full transition-all">delete</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
