import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PostContext = createContext();

export function PostProvider({ children }) {
  const { token, user } = useAuth();
  const [posts, setPosts] = useState([]);

  // O currentUser agora vem do contexto de autenticação real
  const currentUser = user
    ? { name: user.name, handle: user.handle, avatar: user.avatarUrl }
    : null;

  const authHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

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
    fetch(`${import.meta.env.VITE_API_URL}/api/posts`)
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
    // O backend extrai author do token — enviamos apenas o content
    fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ content }),
    })
      .then(res => res.json())
      .then(data => {
        const addedPost = { ...data, time: formatTime(data.createdAt) };
        setPosts(prev => [addedPost, ...prev]);
      })
      .catch(err => console.error("Failed to add post", err));
  };

  const toggleLike = (id) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const isCurrentlyLiked = post.isLiked || false;
    const newIsLiked = !isCurrentlyLiked;

    // Optimistic UI update
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: newIsLiked,
          likes: newIsLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
        };
      }
      return p;
    }));

    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}/like?isLiked=${newIsLiked}`, {
      method: 'PATCH',
      headers: authHeaders,
    })
      .then(res => {
        if (!res.ok) fetchPosts(); // Reverte se falhou
      })
      .catch(() => fetchPosts());
  };

  const deletePost = (id) => {
    const previousPosts = [...posts];
    // Optimistic UI update
    setPosts(prev => prev.filter(post => post.id !== id));

    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
    })
      .then(res => {
        if (!res.ok) setPosts(previousPosts); // Reverte se falhou
      })
      .catch(() => setPosts(previousPosts));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, toggleLike, deletePost, currentUser, formatTime, setPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
