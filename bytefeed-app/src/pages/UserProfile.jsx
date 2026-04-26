import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { usePosts } from "../PostContext";

export default function UserProfile() {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { posts } = usePosts();
  
  const [activeTab, setActiveTab] = useState("Posts");

  // Filter posts by this user handle. For the "my_handle" case, we simulate it.
  const userPosts = posts.filter(p => p.authorHandle === handle);

  // Fallback user info if not found in posts
  const userInfo = userPosts.length > 0 ? {
    name: userPosts[0].authorName,
    handle: userPosts[0].authorHandle,
    avatar: userPosts[0].avatar,
    bio: "Building the future, one byte at a time. React & Node developer.",
    joined: "March 2026",
    following: 142,
    followers: 1042
  } : {
    name: "User Not Found",
    handle: handle,
    avatar: "https://via.placeholder.com/150",
    bio: "No bio available.",
    joined: "Unknown",
    following: 0,
    followers: 0
  };

  return (
    <div className="max-w-2xl mx-auto bg-surface-container-lowest min-h-screen border-l border-r border-outline-variant/20 relative pb-20 md:pb-0">
      <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex items-center gap-6 px-4 py-2">
          <button onClick={() => navigate(-1)} className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container transition-all text-on-surface">
            arrow_back
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-on-surface leading-tight">{userInfo.name}</h1>
            <span className="text-sm text-on-surface-variant leading-tight">{userPosts.length} posts</span>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#cfe5ff] to-[#b6d8fe]"></div>
        
        <div className="absolute -bottom-16 left-4">
          <div className="w-32 h-32 rounded-full border-4 border-surface-container-lowest overflow-hidden bg-surface">
            <img className="w-full h-full object-cover" src={userInfo.avatar} alt={userInfo.name} />
          </div>
        </div>
      </div>

      <div className="px-4 pt-3 flex justify-end">
        <button className="px-4 py-1.5 rounded-full border border-outline font-semibold text-on-surface hover:bg-surface-container transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-2xl font-bold text-on-surface">{userInfo.name}</h2>
        <p className="text-on-surface-variant">@{userInfo.handle}</p>
        
        <p className="mt-4 text-on-surface text-sm md:text-base">
          {userInfo.bio}
        </p>

        <div className="flex items-center gap-1 mt-3 text-on-surface-variant text-sm">
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          <span>Joined {userInfo.joined}</span>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex gap-1">
            <span className="font-bold text-on-surface">{userInfo.following}</span>
            <span className="text-on-surface-variant">Following</span>
          </div>
          <div className="flex gap-1">
            <span className="font-bold text-on-surface">{userInfo.followers}</span>
            <span className="text-on-surface-variant">Followers</span>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-4 border-b border-outline-variant/20">
        {["Posts", "Replies", "Likes"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-center font-medium relative hover:bg-surface-container/50 transition-colors ${activeTab === tab ? 'text-on-surface font-bold' : 'text-on-surface-variant'}`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary-container rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {userPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        {userPosts.length === 0 && (
          <div className="p-8 text-center text-on-surface-variant">
            No posts yet.
          </div>
        )}
      </div>
    </div>
  );
}
