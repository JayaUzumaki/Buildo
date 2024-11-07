import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePocket } from "./context/PocketContext";
import "./styles/style1.css"; // Ensure your CSS file is imported
import logo from "/BLK_BUI-removebg-preview.png";

const Forum = () => {
  const [forums, setForums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const forumsPerPage = 8; // Number of forums per page (4 rows, 2 columns)
  const { user, isAuthenticated, pb } = usePocket();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);
    setError("");

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
      alert("Forum created successfully!");
    } catch (error) {
      console.error("Error creating forum:", error);
      setError("Error creating forum. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter forums based on the search term and paginate results
  const filteredForums = forums.filter((forum) =>
    forum.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalForums = filteredForums.length;
  const totalPages = Math.ceil(totalForums / forumsPerPage);
  const paginatedForums = filteredForums.slice(
    (currentPage - 1) * forumsPerPage,
    currentPage * forumsPerPage
  );

  const changePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <section className="header">
        <nav>
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </nav>
        <div className="textbox">
          <h1 id="forum" className="forumhead">
            Forums
          </h1>
          {/* Search bar and Create Forum button right below the heading */}
          <div className="search-create-section">
            <input
              type="text"
              className="search-bar"
              placeholder="Search forums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="create-forum-btn"
              onClick={handleCreateForumClick}
            >
              +
            </button>
          </div>
        </div>

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
            {error && <p className="error-message">{error}</p>}
          </div>
        )}

        <div className="forum-list">
          {paginatedForums.map((forum) => (
            <div key={forum.id} className="forum-item">
              <Link to={`/forum/${forum.id}`}>
                <h3>{forum.title}</h3>
                <p>By: {forum.expand?.user_id?.username || "Unknown User"}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Forum;
