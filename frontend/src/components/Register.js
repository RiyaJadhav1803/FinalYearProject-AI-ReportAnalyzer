import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accepted) {
      alert("Please accept Terms & Conditions");
      return;
    }

    try {
      const res = await API.post("/auth/register", data);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <nav className="navbar">
              <div className="logo">
                <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span className="logo-icon">🧠</span> AI Medical Analyzer
                </Link>
              </div>
      
            </nav>
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account 🩺</h2>
        <p className="auth-sub">
          Join us to easily manage and understand your health reports
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />

          <div className="terms-box">
            <input
              type="checkbox"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
            />
            <label>I accept Terms & Conditions</label>
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <p className="auth-text">
          Already have an account?
          <Link to="/login" className="auth-link"> Login here</Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Register;
