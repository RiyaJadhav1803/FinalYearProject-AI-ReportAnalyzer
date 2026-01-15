import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./Profile.css";
import { useState } from "react";
import API from "../api";


function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);


  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleChangePassword = async () => {
  if (!oldPassword || !newPassword) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await API.put(
      "/profile/change-password",
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    alert(res.data.message);
    setOldPassword("");
    setNewPassword("");
  } catch (err) {
    alert(err.response?.data?.message || "Password update failed");
  }
};

const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "⚠️ Are you sure? This will permanently delete your account."
  );

  if (!confirmDelete) return;

  try {
    await API.delete("/profile/delete-account", {
      headers: {
        Authorization: `${token}`,
      },
    });

    alert("Account deleted");
    localStorage.clear();
    window.location.href = "/register";
  } catch {
    alert("Failed to delete account");
  }
};



  return (
    <div className="profile-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: "none", color: "white", display: "flex", alignItems: "center", gap: "6px" }} className="logo">
          <span className="logo-icon">🧠</span> AI Medical Analyzer
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/profile" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "6px" }} className="user-pill">
              👤 {user?.name}
            </Link>
          </li>
          <li onClick={handleLogout} className="logout-pill">
            Logout
          </li>
        </ul>
      </nav>

      {/* PROFILE CONTENT */}
      <div className="profile-content">

        {/* PROFILE CARD */}
        <div className="profile-card">
          <div className="avatar">👤</div>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <span className="badge">Patient Account</span>
        </div>

        {/* MEDICAL INFO */}
        <div className="section-card">
          <h3>🩺 Medical Information</h3>
          <div className="info-grid-profile">
            <div><strong>Age:</strong> Not provided</div>
            <div><strong>Gender:</strong> Not provided</div>
            <div><strong>Known Conditions:</strong> None</div>
            <div><strong>Allergies:</strong> None</div>
          </div>
          <p className="hint">* This data will be auto-filled from medical reports.</p>
        </div>

        {/* REPORTS */}
        <div className="section-card">
          <h3>📁 Uploaded Medical Reports</h3>
          <Link to="/" className="upload-btn">Upload New Report</Link>
        </div>

        {/* ACCOUNT ACTIONS */}
       <div className="section-card actions">
            <h3>⚙️ Account Actions</h3>

            {/* CHANGE PASSWORD BUTTON */}
            {!showPasswordForm && (
                <button onClick={() => setShowPasswordForm(true)}>
                Change Password
                </button>
            )}

            {/* PASSWORD FORM */}
            {showPasswordForm && (
                <div className="password-form">
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <div className="password-actions">
                    <button onClick={handleChangePassword}>
                    Update Password
                    </button>

                    <button
                    className="cancel"
                    onClick={() => {
                        setShowPasswordForm(false);
                        setOldPassword("");
                        setNewPassword("");
                    }}
                    >
                    Cancel
                    </button>
                </div>
                </div>
            )}

            {/* DELETE ACCOUNT */}
            <button className="danger" onClick={handleDeleteAccount}>
                Delete Account
            </button>
            </div>

      </div>
    </div>
  );
}

export default Profile;
