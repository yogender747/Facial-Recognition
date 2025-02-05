import React, { useState } from "react";
import "./Contact.css"; // Import CSS
import { FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";

function Contact() {
  // State for the contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration, we'll log the data. You can integrate with an API or email service.
    console.log("Contact Form Data:", formData);
    setFormStatus("Your message has been sent!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // Dummy testimonials data
  const testimonials = [
    {
      name: "Alice Johnson",
      feedback: "MoodSync completely transformed my music experience! Highly recommended."
    },
    {
      name: "Mark Thompson",
      feedback: "The personalized playlists are on point. I feel like the AI DJ knows my vibe."
    },
    {
      name: "Samantha Lee",
      feedback: "A fantastic service with a smooth interface. My daily soundtrack just got better."
    }
  ];

  return (
    <div className="contact-container">
      {/* Background Video */}
      <video className="contact-video" autoPlay loop muted>
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Back Button (Top-Left) */}
      <a href="http://localhost:3000/home" className="back-button">
        Back
      </a>

      {/* About Us Button (Top-Right) */}
      <a href="http://localhost:3000/about" className="about-button">
        About Us
      </a>

      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-boxes">
        {/* Yogender */}
        <div className="contact-box">
          <h2>Yogender</h2>
          <p>Senior AI Developer</p>
          <div className="social-links">
            <a
              href="https://x.com/Saviacc1"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/rishi_.hr?igsh=MWFoc2I0bGY0NDUw&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:yogendersingh257@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaEnvelope />
            </a>
            <a
              href="tel:+919996298132"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaPhone />
            </a>
            <a
              href="https://www.linkedin.com/in/yogender-singh-957952270/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Sahil */}
        <div className="contact-box">
          <h2>Sahil</h2>
          <p>Lead Backend Engineer</p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
              <FaTwitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
              <FaInstagram />
            </a>
            <a href="mailto:sahil@example.com" target="_blank" rel="noopener noreferrer" className="icon">
              <FaEnvelope />
            </a>
            <a href="tel:+9876543210" target="_blank" rel="noopener noreferrer" className="icon">
              <FaPhone />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Sajid */}
        <div className="contact-box">
          <h2>Sajid</h2>
          <p>UI/UX Designer</p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
              <FaTwitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
              <FaInstagram />
            </a>
            <a href="mailto:sajid@example.com" target="_blank" rel="noopener noreferrer" className="icon">
              <FaEnvelope />
            </a>
            <a href="tel:+1122334455" target="_blank" rel="noopener noreferrer" className="icon">
              <FaPhone />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form-container">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
        {formStatus && <p className="form-status">{formStatus}</p>}
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-container">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial">
              <p className="feedback">"{t.feedback}"</p>
              <p className="user-name">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
