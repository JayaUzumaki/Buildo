import React, { useState } from "react";
import "./styles/report.css"; // Assuming you have styles for modal
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { usePocket } from "./context/PocketContext";
import logo from "/BLK_BUI-removebg-preview.png"; // Your logo image

const GenerateReportModal = () => {
  const { user, logout } = usePocket(); // Access user and logout function
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logout and redirect
  const handleLogout = async () => {
    try {
      await logout(); // Perform the logout operation
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to handle report generation and opening modal
  const handleGenerateReport = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <section className="header">
        <nav>
          <Link to="/">
            <img src="/BLK_BUI-removebg-preview.png" alt="Logo" />
          </Link>
          <div className="nav-links">
            <ul>
              <li>
                <a href="#home">HOME</a>
              </li>
              <li>
                <Link to="/configure">CONFIGURATOR</Link>{" "}
                {/* Link to the Configurator */}
              </li>
              <li>
                <Link to="/build">BUILDS</Link>{" "}
              </li>
              <li>
                <Link to="/forum">FORUMS</Link> {/* Updated to Link to forum */}
              </li>
              <li>
                <a href="#aboutus1">ABOUT</a>
              </li>

              {/* Conditional rendering based on authentication */}
              {!user ? (
                <li>
                  <Link to="/login">LOGIN</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/update-profile">UPDATE PROFILE</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      LOGOUT
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <div className="generate-report-container">
          {/* Generate Report Button */}
          <button
            onClick={handleGenerateReport}
            className="generate-report-button"
          >
            Generate Report
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Report Successfully Generated</h2>
                <button
                  onClick={handleCloseModal}
                  className="close-modal-button"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GenerateReportModal;
