import React, { useState } from "react";
import { usePocket } from "./context/PocketContext"; // Ensure this path is correct
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"; // Import icons
import "./styles/style.css"; // Adjust the path if needed

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for tracking errors
  const { login } = usePocket();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    try {
      await login(username, password); // Use your existing login function
      console.log("Logged in");
      navigate("/"); // Navigate to the home page after successful login
    } catch (error) {
      setError("Wrong credentials. Please try again."); // Set error message on failure
      console.error("Login failed", error.message);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1 className="loginhead">Login</h1>
        {/* Conditionally render error message */}
        {error && <p className="error-message">{error}</p>}
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FontAwesomeIcon icon={faUser} className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon icon={faLock} className="icon" />
        </div>
        <div className="remember-forget">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <Link to="/forgot-password">Forget Password?</Link>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="register-link">
          <p className="acc">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
