import React, { useEffect, useState } from "react";
import apiServices from "../services/apiServices.js";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiServices.get("/posts");
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch posts: ", err);
        setError("Failed to fetch posts. Please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleDelete = async(postId) => {

    const isConfirmed = window.confirm('Are you sure you wan to delete this post? This action cannot be undone.');

    if(!isConfirmed){
      return;
    }

    try{
      await apiServices.delete(`/posts/${postId}`);
      setPost(currentPosts => currentPosts.filter(post => post._id !== postId));
      alert('post deleled successfully!');
    }catch(err){
      console.error("Failed to delete the post", err);
      alert('Failed to delete the post. Please try again.')
    }
  }

  if (loading) {
    return <div className="loading-message">Loading posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Manage Post</h2>
        <Link to='/admin/create-post' className="create-post-btn">
          + Create New Post
        </Link>
      </div>
      <table className="post-table">
        <thead>
          <tr>
            <th>Title</th>
            <th className="author-cell">Author</th>
            <th className="time-cell">Published</th>
            <th className="action-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post._id}>
                <td className="title-cell">{post.title}</td>
                <td className="author-cell">{post.author}</td>
                <td className="time-cell">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="action-buttons">
                  <Link
                    to={`/admin/edit-post/${post.slug}`}
                    className="btn edit-btn"
                  >
                    Edit
                  </Link>
                  <button className="btn delete-btn" onClick={() => handleDelete(post._id)}> Delete </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No posts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
