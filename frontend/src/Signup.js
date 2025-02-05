import React, { useState } from "react";
import "./Auth.css";
import bgm from "./components/bgm.mp4";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }
    if (localStorage.getItem(email)) {
      setMessage("❌ User already exists!");
      return;
    }

    setLoading(true);

    const userData = {
      name,
      dob,
      email,
      password,
      plan: "Free",
      profilePic: "",
      subscriptionExpiry: "N/A",
    };

    localStorage.setItem(email, JSON.stringify(userData));

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    if (!registeredUsers.includes(email)) {
      registeredUsers.push(email);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    }

    localStorage.setItem("userProfile", JSON.stringify(userData));

    setMessage("✅ Signup successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="auth-container">
      <video className="auth-video" autoPlay loop muted>
        <source src={bgm} type="video/mp4" />
      </video>
      <div className="overlay"></div>
      
      <div className="auth-box expanded">
        <h1 className="auth-title">Join MoodSync</h1>
        <p className="auth-subtitle">Let the AI DJ curate your perfect playlist!</p>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <form onSubmit={handleSignup}>
            {/* First Row */}
            <div className="input-row">
              <div className="input-container">
                <input 
                  type="text" 
                  required 
                  placeholder="Full Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="auth-input" 
                />
              </div>
              <div className="input-container">
                <input 
                  type="date" 
                  required 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)} 
                  className="auth-input" 
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="input-row">
              <div className="input-container">
                <input 
                  type="email" 
                  required 
                  placeholder="Email Address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="auth-input" 
                />
              </div>
            </div>

            {/* Third Row (Password Fields) */}
            <div className="input-row">
              <div className="input-container password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
                <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁"} 
                </span>
              </div>
              <div className="input-container password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input"
                />
                <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            <button type="submit" className="auth-button">Signup & Jam</button>
          </form>
        )}
        
        {message && <p className="auth-message">{message}</p>}
        <p className="auth-link">Already a member? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;
