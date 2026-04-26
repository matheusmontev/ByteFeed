import { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      authorName: "Alex Rivera",
      authorHandle: "arivera",
      time: "2m",
      content: "Just joined ByteFeed! Excited to see where this goes.",
      comments: 12,
      retweets: 5,
      likes: 24,
      isLiked: false,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH8g8EHTLxnnInVfls-6k6QeH6Wbnq4e2HE7xTGAXlEvqnD-PIrZYhsFDlFNBgxLaZuPBnvdfLoxhHInGlHenwr0hI_Mi4pOBGmSagIyeo3H3XehGHCayLsHKgbAElUp0oH5Hn4CN-uqLGRzE_pzrN71drHq9h-KDEdfIv05IiXNYZezS3motxc12-J7SVNOWSsNay8SE5yv-lrRqJhWCy42JDElQMYR_rI1kXBhTrmWnsCWfo6smmFAsT1pbDYrQW45h713gUPnt6"
    },
    {
      id: 2,
      authorName: "Sarah Chen",
      authorHandle: "schen_dev",
      time: "15m",
      content: "Building the future, one byte at a time. 🚀",
      comments: 48,
      retweets: 102,
      likes: 342,
      isLiked: true,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoVYuDQxV7aOIo7IoOz8LHaDkKkkDYbypQru07ygFFT8FF6e6tyVjFwKyW_vmlCn0UrV_WpBAHmQKNnNld6auoeqLb66iWmlMknLfANzK79-ntqOrIGZUhf0RKLAo9WpKzhdI1jweM7i_ERUT-jBG2haJ5fRaJK08E319W4-nWuBKDahAhW-xDEtUXV2o8LkHxbv1hVoMTEq4p7_n9emTAS9IWr3ObL0rdrpOn_WLXq92NsiXnZ0uj6xn2KuyJ3zW5xtjsqEY692c-"
    },
    {
      id: 3,
      authorName: "Jordan Smith",
      authorHandle: "jsmith",
      time: "1h",
      content: "Is it just me or is minimalist design just better?",
      comments: 5,
      retweets: 2,
      likes: 89,
      isLiked: false,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ6C4cFUD9rMh-kHpKWmBZNjGX9cixnvCUUOTASvN7fQ-_TWm9eFSFDGyqs5b5xiD_VJPiWuobXOOWzN0H5_iJxGp8Z5bjAJsD06cGP6j-8ASY9s3vT18ZdGYdNaIRNXDfG0epauNO6hdbSEqhIDYX2ublt_k7CP6bl-kF3hwoYMYzx95A3bBzu0MY_F2wmYJQMx5Klmk8xImpnMdRCgJWJaRNuTyw8BytOSHfYEK6M3p9gAv2F-XUOONYjB71-IJYMiq5C6U92wpy"
    }
  ]);

  const addPost = (content) => {
    const newPost = {
      id: Date.now(),
      authorName: "Me",
      authorHandle: "my_handle",
      time: "just now",
      content,
      comments: 0,
      retweets: 0,
      likes: 0,
      isLiked: false,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfTEVI-kwqn07qibiCe8faZpobwkfd_u2kgdwJR13SHl4H_z2Wnwl_39GndEYZLcfF0HRP1w0G5vfT7Kosm9yD-ba3rULpTaw5vUQqVVwuSrFuVKBYMu_wMr0Vn3EI6Xg8rb8_Hb0ccMGmNPatfld84wsaGoMO7GLBsqdvUbdaU6T-rdFILqb25GGeZxmwaI2-P6J7mDk3xyjAwvd8GDo1Mnw5snkTh1Yh49C6wOGPyvlvHQwnRVtuJmW7hEdxvxtmanUK8ltUeBO8"
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, toggleLike, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
