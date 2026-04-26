import { useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { usePosts } from "../PostContext";

export default function MainFeed() {
  const { posts, addPost } = usePosts();
  const [newPostContent, setNewPostContent] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  const handlePost = () => {
    if (newPostContent.trim()) {
      addPost(newPostContent);
      setNewPostContent("");
    }
  };

  const filteredPosts = posts.filter(post => 
    post.authorName.toLowerCase().includes(filterQuery.toLowerCase()) || 
    post.authorHandle.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto bg-surface-container-lowest min-h-screen border-l border-r border-outline-variant/20 relative">
      <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/feed" className="text-xl font-extrabold tracking-tighter text-primary-container">
              ByteFeed
            </Link>
          </div>
          <div className="flex-1 max-w-xs mx-4">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input 
                className="w-full bg-surface-container border-none rounded-full py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-container transition-all text-on-surface" 
                placeholder="Filter by author..." 
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/profile/my_handle">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfTEVI-kwqn07qibiCe8faZpobwkfd_u2kgdwJR13SHl4H_z2Wnwl_39GndEYZLcfF0HRP1w0G5vfT7Kosm9yD-ba3rULpTaw5vUQqVVwuSrFuVKBYMu_wMr0Vn3EI6Xg8rb8_Hb0ccMGmNPatfld84wsaGoMO7GLBsqdvUbdaU6T-rdFILqb25GGeZxmwaI2-P6J7mDk3xyjAwvd8GDo1Mnw5snkTh1Yh49C6wOGPyvlvHQwnRVtuJmW7hEdxvxtmanUK8ltUeBO8" alt="Me" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <section className="p-6 border-b border-outline-variant/10">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfTEVI-kwqn07qibiCe8faZpobwkfd_u2kgdwJR13SHl4H_z2Wnwl_39GndEYZLcfF0HRP1w0G5vfT7Kosm9yD-ba3rULpTaw5vUQqVVwuSrFuVKBYMu_wMr0Vn3EI6Xg8rb8_Hb0ccMGmNPatfld84wsaGoMO7GLBsqdvUbdaU6T-rdFILqb25GGeZxmwaI2-P6J7mDk3xyjAwvd8GDo1Mnw5snkTh1Yh49C6wOGPyvlvHQwnRVtuJmW7hEdxvxtmanUK8ltUeBO8" alt="Me" />
            </div>
          </div>
          <div className="flex-1">
            <textarea 
              className="w-full border-none focus:ring-0 text-lg placeholder:text-on-surface-variant/50 resize-none bg-transparent text-on-surface focus:outline-none" 
              placeholder="What's on your mind?" 
              rows="3"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/10">
              <div className="flex gap-1 text-primary-container">
                <button className="material-symbols-outlined p-2 rounded-full hover:bg-primary-fixed/30 transition-all">image</button>
                <button className="material-symbols-outlined p-2 rounded-full hover:bg-primary-fixed/30 transition-all">gif_box</button>
                <button className="material-symbols-outlined p-2 rounded-full hover:bg-primary-fixed/30 transition-all">poll</button>
              </div>
              <button 
                onClick={handlePost}
                disabled={!newPostContent.trim()}
                className="bg-gradient-to-br from-primary-container to-primary text-on-primary px-6 py-2 rounded-full font-semibold transition-all active:scale-95 hover:opacity-90 shadow-md disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center" id="no-results">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
            <h3 className="text-xl font-semibold text-on-surface mb-2">No posts found</h3>
            <p className="text-on-surface-variant">No posts found for this author. Try a different name or clear the filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
