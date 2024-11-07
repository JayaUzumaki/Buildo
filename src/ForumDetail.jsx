import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePocket } from "./context/PocketContext";
import "./styles/forumdetail.css";
import logo from "/BLK_BUI-removebg-preview.png";

const ForumDetail = () => {
  const { id } = useParams();
  const { pb, user } = usePocket();
  const [forumDetail, setForumDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchForumDetail = async () => {
      try {
        // Expanding the user_id field to get the username directly
        const detail = await pb.collection("forums").getOne(id, {
          expand: "user_id",
        });
        if (isMounted) {
          setForumDetail(detail);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed to fetch forum details.");
          setLoading(false);
        }
      }
    };

    fetchForumDetail();

    return () => {
      isMounted = false;
    };
  }, [id, pb]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await pb.collection("posts").getFullList({
          filter: `forum_id = "${id}"`,
          expand: "user_id",
          $autoCancel: false,
        });
        setComments(result);
      } catch (error) {
        setError("Failed to fetch comments.");
        console.error("Failed to fetch comments", error);
      }
    };

    fetchComments();
  }, [id, pb]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    const commentUser = user?.username || prompt("Please enter a username:");
    if (!commentUser) return;

    try {
      const createdComment = await pb.collection("posts").create({
        content: comment,
        user_id: user?.id || null,
        username: commentUser,
        forum_id: id,
      });

      setComments((prev) => [
        ...prev,
        { ...createdComment, username: commentUser },
      ]);
      setComment("");
      setIsReplying(false);

      document
        .querySelector(".comments-section")
        .scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Failed to submit comment", error);
      setError("Failed to submit comment. Please try again.");
    }
  };

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  if (loading) return <div className="loading">Loading, please wait...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="forum-detail-page">
      {/* Navbar with logo and back link */}
      <nav className="detail-nav1">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Link to="/forum" className="back-link">
          Back to Forums
        </Link>
      </nav>

      {/* Forum detail section */}
      <div className="forum-detail-content">
        <h1 className="forum-title">{forumDetail?.title}</h1>
        <p className="forum-author">
          Posted by {forumDetail?.expand?.user_id?.username || "Anonymous"}
        </p>
        <p className="forum-description">{forumDetail?.desc}</p>
      </div>

      {/* Comments section */}
      <div className="comments-section">
        <h2 className="comments-heading">Comments</h2>
        {user && !isReplying && (
          <button className="reply-button" onClick={handleReplyClick}>
            Reply
          </button>
        )}
        {isReplying && (
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              className="comment-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              required
            />
            <div className="reply-actions">
              <button type="submit" className="submit-comment-button">
                Submit Comment
              </button>
              <button
                type="button"
                className="cancel-reply-button"
                onClick={() => setIsReplying(false)}
              >
                Cancel Reply
              </button>
            </div>
          </form>
        )}
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-author">
                {comment.username ||
                  comment.expand?.user_id?.username ||
                  "Unknown User"}
                :
              </div>
              <span className="comment-text">{comment.content}</span>
            </li>
          ))}
        </ul>
        {!user && <p>Please log in to post a comment.</p>}
      </div>
    </div>
  );
};

export default ForumDetail;
