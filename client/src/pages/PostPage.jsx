import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiServices from '../services/apiServices.js';
import ReactMarkdown from "react-markdown";
import '../markdown-styles.css'

const PostPage = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiServices.get(
          `${import.meta.env.VITE_API_URL}/api/posts/${slug}`
        );        
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post", err);
        if (err.response && err.response.status === 404) {
          setError("Post not found");
        } else {
          setError("Failed to load the post. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div>Loading posts...</div>;
  if (error)
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
        Error: {error}
      </div>
    );
  if (!post) return <div>Post not found</div>;

  return (
    <article className="post-full">
      <h1>{post.title}</h1>
      <div className="post-full-meta">
        <span>
          by {post.author} published on{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="post-full-content">
        <ReactMarkdown>{post.markdownContent}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostPage;
