import React, { useState, useEffect } from "react";
import { usePocket } from "./context/PocketContext";
import { useNavigate } from "react-router-dom";
import "./styles/UpdateProfile.css";

export default function UpdateProfile() {
  const [newEmail, setNewEmail] = useState(""); // Start with empty string
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [activeTab, setActiveTab] = useState("email");
  const {
    user,
    updateEmail,
    updatePassword,
    deleteAccount,
    fetchUserData,
    logout,
  } = usePocket();
  const navigate = useNavigate();

  // Update local state to reflect current user email when the user changes
  useEffect(() => {
    if (user && user.email) {
      setNewEmail(user.email); // Set the email input to the current user's email
    }
  }, [user]); // Depend on user object

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    console.log("Submitting update with:", {
      newEmail,
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    try {
      if (activeTab === "email") {
        if (!newEmail || !currentPassword) {
          alert("Email and current password cannot be blank.");
          return;
        }
        await updateEmail(newEmail, currentPassword);
        alert("Email updated successfully!");
        await fetchUserData(); // Fetch updated user data
        await logout(); // Log out after email update
        navigate("/"); // Redirect to home after logout
      } else if (activeTab === "password") {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
          alert(
            "Current password, new password, and confirmation cannot be blank."
          );
          return;
        }
        if (newPassword !== confirmNewPassword) {
          alert("Passwords do not match!");
          return;
        }
        await updatePassword(currentPassword, newPassword);
        alert("Password updated successfully!");
        await fetchUserData(); // Fetch updated user data
        await logout(); // Log out after password update
        navigate("/"); // Redirect to home after logout
      } else if (activeTab === "delete") {
        if (window.confirm("Are you sure you want to delete your account?")) {
          await deleteAccount();
          alert("Account deleted successfully!");
          navigate("/"); // Redirect after deletion
        }
      }
    } catch (error) {
      console.error("Profile update failed", error.message);
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  return (
    <div className="update-profile-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li
            className={activeTab === "email" ? "active" : ""}
            onClick={() => setActiveTab("email")}
          >
            Change Email
          </li>
          <li
            className={activeTab === "password" ? "active" : ""}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </li>
          <li
            className={activeTab === "delete" ? "active" : ""}
            onClick={() => setActiveTab("delete")}
          >
            Delete Account
          </li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="update-profile-container">
        <center>
          <div className="title">
            {activeTab === "email"
              ? "Change Email"
              : activeTab === "password"
              ? "Change Password"
              : "Delete Account"}
          </div>
        </center>
        <div className="content">
          <form onSubmit={handleUpdateProfile}>
            {activeTab === "email" && (
              <>
                <div className="input-box">
                  <span className="details">New Email</span>
                  <input
                    type="email"
                    placeholder="Enter your new email"
                    value={newEmail} // Control input with state
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Current Password</span>
                  <input
                    type="password"
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {activeTab === "password" && (
              <>
                <div className="input-box">
                  <span className="details">Current Password</span>
                  <input
                    type="password"
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">New Password</span>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Confirm New Password</span>
                  <input
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {activeTab === "delete" && (
              <div className="input-box">
                <span className="details">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </span>
              </div>
            )}

            <div className="button">
              <input
                type="submit"
                value={
                  activeTab === "delete" ? "Delete Account" : "Update Profile"
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
