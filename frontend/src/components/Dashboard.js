import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="dashboard-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="logo-icon">🧠</span> AI Medical Analyzer
          </Link>
        </div>

        <ul className="nav-links">
          {!token ? (
            <>
              <li>
                <Link to="/login" className="nav-btn">Login</Link>
              </li>
              <li>
                <Link to="/register" className="nav-btn">Register</Link>
              </li>
            </>
          ) : (
            <>
              {/* <li className="user-pill">👤 {user?.name}</li> */}
              <li>
                <Link to="/profile" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "6px" }} className="user-pill">
                  👤 {user?.name}
                </Link>
              </li>

              <li onClick={handleLogout} className="logout-pill">Logout</li>
            </>
          )}
        </ul>
      </nav>


      {/* MAIN */}
      <div className="dashboard-content">

        {/* WELCOME */}
        <div className="welcome-card">
          <h1>{token ? `Welcome, ${user?.name} 👋` : "Welcome to AI Medical Analyzer"}</h1>
          <p>
            Your Intelligent Healthcare Assistant — Upload your report, get AI-based summary, 
            disease insights, diet recommendations and chat support.
          </p>

          {!token && (
            <div className="cta-buttons">
              <Link to="/login" className="primary-btn">Login</Link>
              <Link to="/register" className="secondary-btn">Create Account</Link>
            </div>
          )}
        </div>


        {/* CORE FEATURE CARDS */}
        <div className="core-section-title">Core Features</div>

        <div className="info-grid">

          <div className="card big-card">
            <h2>🧠 AI Medical Report Summary</h2>
            <p>
              Upload your medical reports. 
              Our AI extracts key parameters and converts 
              them into understandable language.
            </p>
            <ul>
              <li>Extracts Key Values</li>
              <li>Understands Medical Terminology</li>
              <li>Explains Reports in Simple Language</li>
              <li>Helps Patients Understand Their Health Better</li>
            </ul>
            {token && <button className="action-btn">Upload Report</button>}
          </div>

          <div className="card big-card">
            <h2>🤖 Patient Chatbot</h2>
            <p>
              A powerful AI chatbot to discuss symptoms.
            </p>
            <ul>
              <li>Chat about diseases</li>
              <li>Ask doubts regarding report</li>
              <li>Understand what values mean</li>
              <li>User friendly conversational support</li>
            </ul>
            {token && <button className="action-btn">Open Chatbot</button>}
          </div>

          <div className="card big-card">
            <h2>🥗 Diet Recommendation System</h2>
            <p>
              Based on the AI generated summary, our system recommends personalized 
              diet plans to improve health conditions.
            </p>
            <ul>
              <li>Diet based on disease detected</li>
              <li>Health focused meal suggestions</li>
              <li>Easy to follow recommendations</li>
              <li>Helps patient recovery better</li>
            </ul>
            {token && <button className="action-btn">Get Diet Plan</button>}
          </div>

        </div>


        {/* WORKFLOW */}
        <div className="workflow-section">
          <h2>🩺 How The System Works</h2>

          <div className="workflow-steps">
            <div className="step">
              <span className="step-number">1</span>
              <h3>Upload Medical Report</h3>
              <p>Upload PDF/Image of your medical report.</p>
            </div>

            <div className="step">
              <span className="step-number">2</span>
              <h3>AI Extracts & Analyzes</h3>
              <p>AI reads, understands and processes values.</p>
            </div>

            <div className="step">
              <span className="step-number">3</span>
              <h3>Human Friendly Summary</h3>
              <p>Clear explanation of what report means.</p>
            </div>

            <div className="step">
              <span className="step-number">4</span>
              <h3>Diet + Chat Support</h3>
              <p>Get diet & chat support for better health.</p>
            </div>
          </div>
        </div>



        {/* FUTURE ENHANCEMENTS */}
        <div className="future-section">
          <h2>🚀 Upcoming Enhancements</h2>

          <div className="future-grid">
            <div className="future-card">
              <h3>📊 Health Trend Graphs</h3>
              <p>Track health progress over time visually.</p>
            </div>

            <div className="future-card">
              <h3>🏥 Doctor Recommendation</h3>
              <p>Suggesting specialist doctors based on report.</p>
            </div>

            <div className="future-card">
              <h3>💉 Disease Risk Prediction</h3>
              <p>Predict health risks using AI models.</p>
            </div>

            <div className="future-card">
              <h3>📁 Patient Health Profile</h3>
              <p>Build complete patient medical history record.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
