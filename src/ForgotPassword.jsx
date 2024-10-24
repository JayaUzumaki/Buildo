import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePocket } from "./context/PocketContext"; // Use the PocketContext
import "./styles/style.css"; // Ensure the path is correct

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { resetPassword } = usePocket(); // Get the resetPassword function from context
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error state before making the request

    try {
      // Call the resetPassword function from context
      await resetPassword(email);
      setSuccessMessage(`Reset link has been sent to: ${email}`);

      // Optionally, redirect after a short delay
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful operation
      }, 3000);
    } catch (error) {
      console.error("Failed to send reset link", error);
      setError("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleReset}>
        <h1 className="forhead">Forgot Password</h1>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}{" "}
        {/* Display success message */}
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Send Reset Link
        </button>
        <div className="register-link">
          <p className="for">
            Remembered your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
