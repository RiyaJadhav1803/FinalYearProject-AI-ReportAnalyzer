
import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./Login.css";


function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
    const [accepted, setAccepted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accepted) {
      alert("Please accept Terms & Conditions");
      return;
    }

    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-sub">Login to continue your health journey</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
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
            Login
          </button>
        </form>

        <p className="auth-text">
          Don't have an account?
          <Link to="/register" className="auth-link"> Register here</Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;

