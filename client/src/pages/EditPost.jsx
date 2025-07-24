import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiServices from "../services/apiServices.js";
import "./CreatePost.css";

const EditPost = () => {
  const { slug } = useParams();

  const [title, setTitle] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await apiServices.get(`/posts/${slug}`);
        setTitle(response.data.title);
        setMarkdownContent(response.data.markdownContent);
      } catch (err) {
        console.error("Failed to fetch post for editing: ", err);
        setError("Failed to load post data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await apiServices.put(`/posts/${slug}`, {
        title,
        markdownContent,
      });
      navigate(`/admin/dashboard`);
    } catch (err) {
      console.error("Failed to update post:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update post. Please try again."
      );
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading post...
      </div>
    );
  }

  return (
    <div className="create-post-page">
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            placeholder="Enter the title"
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="markdownContent">Content (Markdown)</label>
          <textarea
            id="markdownContent"
            className="form-control markdown-input"
            value={markdownContent}
            placeholder="Enter the markdownContent"
            onChange={(e) => setMarkdownContent(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Updating..." : "Post Updated."}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
