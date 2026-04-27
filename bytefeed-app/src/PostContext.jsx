import { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const formatTime = (isoString) => {
    if (!isoString) return 'just now';
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  };

  const fetchPosts = () => {
    fetch('http://localhost:8080/api/posts')
      .then(res => res.json())
      .then(data => {
        const mappedPosts = data.map(post => ({
          ...post,
          time: formatTime(post.createdAt)
        }));
        setPosts(mappedPosts);
      })
      .catch(err => console.error("Failed to fetch posts:", err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = (content) => {
    const newPostData = {
      authorName: "Me",
      authorHandle: "my_handle",
      content,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfTEVI-kwqn07qibiCe8faZpobwkfd_u2kgdwJR13SHl4H_z2Wnwl_39GndEYZLcfF0HRP1w0G5vfT7Kosm9yD-ba3rULpTaw5vUQqVVwuSrFuVKBYMu_wMr0Vn3EI6Xg8rb8_Hb0ccMGmNPatfld84wsaGoMO7GLBsqdvUbdaU6T-rdFILqb25GGeZxmwaI2-P6J7mDk3xyjAwvd8GDo1Mnw5snkTh1Yh49C6wOGPyvlvHQwnRVtuJmW7hEdxvxtmanUK8ltUeBO8",
      comments: 0,
      retweets: 0,
      likes: 0
    };

    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPostData)
    })
      .then(res => res.json())
      .then(data => {
        const addedPost = { ...data, time: formatTime(data.createdAt) };
        setPosts([addedPost, ...posts]);
      })
      .catch(err => console.error("Failed to add post", err));
  };

  const toggleLike = (id) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    
    // Optimistic UI update
    const isCurrentlyLiked = post.isLiked || false;
    const newIsLiked = !isCurrentlyLiked;
    
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: newIsLiked,
          likes: newIsLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
        };
      }
      return p;
    }));

    fetch(`http://localhost:8080/api/posts/${id}/like?isLiked=${newIsLiked}`, {
      method: 'PATCH'
    })
      .then(res => {
        if (!res.ok) {
           // Revert if failed
           fetchPosts();
        }
      })
      .catch(err => {
         console.error("Failed to toggle like", err);
         fetchPosts(); // Revert if failed
      });
  };

  const deletePost = (id) => {
    // Optimistic UI update
    const previousPosts = [...posts];
    setPosts(posts.filter(post => post.id !== id));

    fetch(`http://localhost:8080/api/posts/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) {
           setPosts(previousPosts);
        }
      })
      .catch(err => {
        console.error("Failed to delete post", err);
        setPosts(previousPosts);
      });
  };

  return (
    <PostContext.Provider value={{ posts, addPost, toggleLike, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
