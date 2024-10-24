import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { usePocket } from "./context/PocketContext";
import Login from "./Login";
import Signup from "./Signup";
import BuildO from "./BuildO";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Configure from "./Configure";
import Forum from "./forum"; // Import the new Forum component
import ForumDetail from "./ForumDetail"; // Import the new ForumDetail component
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/App.css";
import "./styles/Forstyle.css";
import "./styles/Regstyle.css";
import "./styles/style.css";

export default function App() {
  const { user, logout } = usePocket();
  const location = useLocation();
  const navigate = useNavigate();

  const bodyClass =
    location.pathname === "/login"
      ? "login-body"
      : location.pathname === "/signup"
      ? "regstyle-body"
      : location.pathname === "/forgot-password"
      ? "forstyle-body"
      : location.pathname === "/configure"
      ? "config-body"
      : location.pathname.startsWith("/forum")
      ? "forum-body" // Add custom class for the Forum page
      : "";

  const showBackButton = location.pathname !== "/";

  return (
    <div className={bodyClass}>
      {showBackButton && (
        <div className="back-nav">
          <button onClick={() => navigate("/")}>
            <i className="fa fa-arrow-left back-arrow"></i>
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<BuildO />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buildo" element={<BuildO />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/configure" element={<Configure />} />
        <Route path="/forum" element={<Forum />} /> {/* Add the Forum route */}
        <Route path="/forum/:id" element={<ForumDetail />} />{" "}
        {/* Add the ForumDetail route */}
      </Routes>
    </div>
  );
}
