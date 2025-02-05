import React, { useState } from "react";
import eye from "./components/ankh.png"; // Your logo/icon image
import "./About.css"; // Import the updated CSS

function About() {
  const [homeHover, setHomeHover] = useState(false);
  const [contactHover, setContactHover] = useState(false);

  return (
    <div className="about-container">
      {/* Background Video */}
      <video autoPlay loop muted className="about-video">
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <a
          href="/home"
          className="home-button"
          style={{ transform: homeHover ? "scale(1.1)" : "scale(1)" }}
          onMouseEnter={() => setHomeHover(true)}
          onMouseLeave={() => setHomeHover(false)}
        >
          Home
        </a>
        <a
          href="https://facerecog-fzhl3ua6j-yogenders-projects-0a943000.vercel.app/contact"
          className="home-button"
          style={{ transform: contactHover ? "scale(1.1)" : "scale(1)", marginLeft: "10px" }}
          onMouseEnter={() => setContactHover(true)}
          onMouseLeave={() => setContactHover(false)}
        >
          Back
        </a>
      </div>

      {/* Scrollable Content Wrapper */}
      <div className="scrollable-content">
        <div className="about-content fadeIn">
          <div className="header">
            <img src={eye} alt="MoodSync Logo" className="about-logo" />
            <h1 className="title">MoodSync</h1>
          </div>

          <p className="description">
            <strong>Welcome to MoodSync</strong> – The AI-powered music recommendation platform that curates the perfect playlist based on your facial expressions. Whether you're feeling ecstatic, contemplative, or in need of a pick-me-up, MoodSync ensures your emotions and music align in perfect harmony.
          </p>

          <h3 className="features-title">Why Choose MoodSync?</h3>
          <ul className="features-list">
            <li>Real-Time AI Emotion Analysis</li>
            <li>Personalized, Curated Playlists</li>
            <li>Seamless & Intuitive Experience</li>
            <li>Discover Music That Resonates With Your Mood</li>
          </ul>

          <h3 className="team-title">Meet Our Team</h3>
          <div className="team-grid">
            <div className="team-member">Yogender – Lead AI Engineer</div>
            <div className="team-member">Sahil Abbas – Music Data Analyst</div>
            <div className="team-member">Sajid – UI/UX Designer</div>
            <div className="team-member">Siddharth – Backend Developer</div>
            <div className="team-member">XYZ – Frontend Specialist</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
