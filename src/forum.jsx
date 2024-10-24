import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePocket } from "./context/PocketContext";
import "./styles/style1.css"; // Your CSS file for forum styles

const Forum = () => {
  const [forums, setForums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user, isAuthenticated, pb } = usePocket();
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    let isMounted = true;

    const fetchForums = async () => {
      try {
        const forumsData = await pb.collection("forums").getFullList({
          expand: "user_id",
        });
        if (isMounted) setForums(forumsData);
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching forums:", error);
        }
      }
    };

    fetchForums();

    return () => {
      isMounted = false;
    };
  }, [pb]);

  const handleCreateForumClick = () => {
    if (isAuthenticated) {
      setShowForm(true);
    } else {
      alert("You need to be logged in to create a forum.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    setError(""); // Reset error state

    try {
      const newForum = await pb.collection("forums").create({
        title,
        desc,
        user_id: user.id,
      });
      console.log("Forum created successfully:", newForum);
      setTitle("");
      setDesc("");
      setShowForm(false);
      alert("Forum created successfully!"); // Success message
    } catch (error) {
      console.error("Error creating forum:", error);
      setError("Error creating forum. Please try again."); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <section className="header">
        <nav>
          <Link to="/">
            <img src="BLK_BUI-removebg-preview.png" alt="Logo" />
          </Link>
        </nav>
        <div className="text-box">
          <h1 id="forum" className="forumhead">
            Forums
          </h1>
        </div>
      </section>

      {!showForm && (
        <div className="create-forum-section">
          <button className="create-forum-btn" onClick={handleCreateForumClick}>
            Create Forum
          </button>
        </div>
      )}

      {showForm && (
        <div className="forum-form">
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Submit"}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
        </div>
      )}

      <div className="forum-list">
        {forums.map((forum) => (
          <div key={forum.id} className="forum-item">
            <Link to={`/forum/${forum.id}`}>
              <h3>{forum.title}</h3>
              <p>By: {forum.expand?.user_id?.username || "Unknown User"}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
