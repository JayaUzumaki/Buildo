import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePocket } from "./context/PocketContext"; // Use the PocketContext
import "./styles/style.css"; // Ensure the path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "/BLK_BUI-removebg-preview.png"; // Adjust the path as necessary

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = usePocket(); // Get the login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error state before making the request

    try {
      const user = await login(email, password); // Assuming login returns user details
      const userRole = user.role; // Extract the role from the user object

      // Redirect based on role
      if (userRole === "admin") {
        navigate("/report"); // Navigate to the report page for admin
      } else {
        navigate("/"); // Navigate to the home page for other users
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-body">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="wrapper">
        <h1 className="loginhead">Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Link to="/forgot-password">Forgot Password?</Link>
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
    </div>
  );
}
