import React, { useState } from "react"; // Import React
import { usePocket } from "./context/PocketContext"; // Ensure you have this context
import { useNavigate, Link } from "react-router-dom"; // For navigation
import "./styles/Regstyle.css"; // Adjust the path if needed
import logo from "/BLK_BUI-removebg-preview.png"; // Import logo

export default function Signup() {
  const [username, setUsername] = useState(""); // Fixed variable name to username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = usePocket(); // Access the register function from context
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check password requirements
    const passwordRequirements =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRequirements.test(password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one number and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // Alert if passwords don't match
      return;
    }

    try {
      await register(username, email, password); // Register the user
      console.log("User registered");
      navigate("/login"); // Navigate to login after successful registration
    } catch (error) {
      console.error("Registration failed", error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="regstyle-body">
      {/* Logo at the top left corner */}
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="container1">
        <center>
          <div className="title">Sign up</div>
        </center>
        <div className="content">
          <form onSubmit={handleSignup}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">UserName</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Use the correct variable name
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="register-link">
              <p className="sign">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
