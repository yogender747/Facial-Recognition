// D:\AI\FR\frontend\src\Login.js
import React, { useState } from "react";
import "./Auth.css"; // Use the upgraded Auth.css below
import bgm from "./components/bgm.mp4"; // Your background video

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // ★★ ADMIN LOGIN CHECK ★★
    if (email === "admin@5" && password === "admin") {
      setMessage("");
      setLoading(true);
      setTimeout(() => {
        window.location.href = "/admin"; // Redirect to admin page
      }, 2000);
      return;
    }

    // Normal user login
    const storedUser = localStorage.getItem(email);
    if (!storedUser) {
      setMessage("User not found!");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.password !== password) {
      setMessage("Oops! Wrong password.");
      return;
    }

    // Successful login: show loading animation
    setMessage("");
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/home"; // Redirect regular user to home page
    }, 2000);
  };

  return (
    <div className="auth-container">
      <video className="auth-video" autoPlay loop muted>
        <source src={bgm} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark overlay for contrast */}
      <div className="overlay"></div>

      <div className="auth-box">
        <h1 className="auth-title">Welcome Back!</h1>
        <p className="auth-subtitle">Get back to your AI-powered playlists!</p>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p className="auth-message">Login successful! Redirecting...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            <button type="submit" className="auth-button">
              Login & Vibe
            </button>
          </form>
        )}

        {/* Show error message only when not loading */}
        {message && !loading && <p className="auth-message">{message}</p>}
        <p className="auth-link">
          New to MoodSync? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
