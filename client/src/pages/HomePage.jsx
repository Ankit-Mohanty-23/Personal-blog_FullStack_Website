import React, { useEffect, useState } from "react";
import axios from "axios";
import PostListItem from "../components/PostListItem";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch posts. Please try again later");
        console.error("Error in fetching Posts: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h1 style={{ paddingBottom: "1rem" }}>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to create one!</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <PostListItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
