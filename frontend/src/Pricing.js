import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const [hoverHome, setHoverHome] = useState(false);
  const navigate = useNavigate();

  // Function to navigate to the payment page with selected plan details
  const handlePlanSelection = (plan, price) => {
    navigate(`/payment?plan=${plan}&price=${price}`);
  };

  return (
    <div style={styles.container}>
      {/* Navigation Buttons (Top-Right) */}
      <div style={styles.navButtons}>
        <a
          href="/home"
          style={{
            ...styles.homeButton,
            transform: hoverHome ? "scale(1.1)" : "scale(1)",
          }}
          onMouseEnter={() => setHoverHome(true)}
          onMouseLeave={() => setHoverHome(false)}
        >
          Home
        </a>
      </div>

      {/* Video Background */}
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for Blur Effect */}
      <div style={styles.overlay}></div>

      {/* Pricing Content */}
      <div style={styles.content}>
        <h1 style={styles.header}>Affordable Plans Tailored for You</h1>

        {/* Pricing Plans in Row Layout */}
        <div style={styles.cardsContainer}>
          {/* Basic Plan */}
          <div
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <div>
              <h2 style={styles.plan}>Basic</h2>
              <p style={styles.price}>₹99/week</p>
              <ul style={styles.features}>
                <li>Basic emotion analysis</li>
                <li>Personalized playlists</li>
                <li>Email support</li>
              </ul>
            </div>
            <button
              onClick={() => handlePlanSelection("Basic", 99)}
              style={styles.button}
            >
              Select Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <div>
              <h2 style={styles.plan}>Pro</h2>
              <p style={styles.price}>₹299/month</p>
              <ul style={styles.features}>
                <li>Advanced emotion analysis</li>
                <li>Priority support</li>
                <li>Exclusive features</li>
              </ul>
            </div>
            <button
              onClick={() => handlePlanSelection("Pro", 299)}
              style={styles.button}
            >
              Select Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <div>
              <h2 style={styles.plan}>Premium</h2>
              <p style={styles.price}>₹999/year</p>
              <ul style={styles.features}>
                <li>Comprehensive emotion analysis</li>
                <li>Dedicated support</li>
                <li>All Pro features & More</li>
              </ul>
            </div>
            <button
              onClick={() => handlePlanSelection("Premium", 599)}
              style={styles.button}
            >
              Select Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    fontFamily: "Poppins, sans-serif",
    color: "white",
    overflow: "hidden",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },
  videoBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: -1,
  },
  navButtons: {
    position: "absolute",
    top: "20px",
    right: "30px",
  },
  homeButton: {
    textDecoration: "none",
    fontSize: "1.2rem",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    transition: "transform 0.3s ease-in-out",
    textAlign: "center",
    display: "inline-block",
  },
  content: {
    backdropFilter: "blur(15px)",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    padding: "30px",
    maxWidth: "1000px",
    width: "90%",
    zIndex: 1,
    position: "relative",
  },
  header: {
    fontSize: "2.5rem",
    color: "#ffcc00",
    marginBottom: "30px",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "15px",
    padding: "15px",
    width: "280px",
    textAlign: "center",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "350px",
  },
  plan: {
    fontSize: "1.8rem",
    marginBottom: "10px",
    color: "#ffcc00",
  },
  price: { fontSize: "2rem", marginBottom: "10px" },
  features: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 15px",
    textAlign: "center",
  },
  button: {
    background: "linear-gradient(45deg, #ff8800, #ffcc00)",
    border: "none",
    color: "white",
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out, background 0.3s ease-in-out",
    textDecoration: "none",
    display: "inline-block",
  },
};

export default Pricing;
