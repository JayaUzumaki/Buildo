import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePocket } from "./context/PocketContext";
import "./styles/style1.css";

const ForumDetail = () => {
  const { id } = useParams();
  const { pb, user } = usePocket();
  const [forumDetail, setForumDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isReplying, setIsReplying] = useState(false); // State to control reply input visibility

  useEffect(() => {
    let isMounted = true;

    const fetchForumDetail = async () => {
      try {
        const detail = await pb.collection("forums").getOne(id);
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

      // Optimistically update comments state
      setComments((prev) => [
        ...prev,
        { ...createdComment, username: commentUser }, // Add new comment to state
      ]);
      setComment(""); // Clear comment input after submission
      setIsReplying(false); // Reset replying state

      // Scroll to comments section after adding a new comment
      document
        .querySelector(".comments-section")
        .scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Failed to submit comment", error);
      setError("Failed to submit comment. Please try again.");
    }
  };

  const handleReplyClick = () => {
    setIsReplying(true); // Set replying state to true
  };

  if (loading) return <div className="loading">Loading, please wait...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div className="forum-title-desc">
        <h1 className="forum-title">{forumDetail.title}</h1>
        <p className="forum-desc">{forumDetail.desc}</p>
      </div>

      <div className="comments-section">
        <h2 style={{ color: "black" }}>Comments</h2>{" "}
        {/* Corrected inline style */}
        {/* Show Reply button only if not replying */}
        {user && !isReplying && (
          <button onClick={handleReplyClick}>Reply</button>
        )}
        {/* Display reply form only if isReplying is true */}
        {isReplying && (
          <form onSubmit={handleSubmit}>
            <textarea
              style={{ color: "black" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              required
            />
            <div className="reply-actions">
              <button type="submit">Submit Comment</button>
              <button type="button" onClick={() => setIsReplying(false)}>
                Cancel Reply
              </button>
            </div>
          </form>
        )}
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong style={{ color: "black" }}>
                {comment.username ||
                  comment.expand?.user_id?.username ||
                  "Unknown User"}
                :
              </strong>{" "}
              <span className="comment-text">{comment.content}</span>{" "}
              {/* Apply the comment-text class here */}
            </li>
          ))}
        </ul>
        {!user && <p>Please log in to post a comment.</p>}
      </div>
    </div>
  );
};

export default ForumDetail;
