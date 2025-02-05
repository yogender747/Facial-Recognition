// src/Profile.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Bgm from './components/bgm.mp4';

// An array of preset avatar image URLs.
// Replace these with your own images or paths.
const presetAvatars = [
  '/avatars/music1.png',
  '/avatars/music2.png',
  '/avatars/music3.png',
  '/avatars/music4.png',
  '/avatars/music5.png',
];

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    dob: '',
    plan: '',
    profilePic: '',
    subscriptionExpiry: '',
  });
  const [editMode, setEditMode] = useState(false);

  // On mount, load profile details from localStorage
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile")) || {
      name: "Guest",
      dob: "",
      plan: "Free",
      profilePic: "",
      subscriptionExpiry: "N/A",
    };
    setProfile(storedProfile);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle file input for profile picture upload (if user wants to use a custom image)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prevProfile) => ({ ...prevProfile, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Remove the profile picture (only in edit mode)
  const removeProfilePic = () => {
    setProfile((prevProfile) => ({ ...prevProfile, profilePic: '' }));
  };

  // Handle selecting a preset avatar
  const selectAvatar = (avatarUrl) => {
    setProfile((prevProfile) => ({ ...prevProfile, profilePic: avatarUrl }));
  };

  const handleSave = () => {
    // Save updated profile (editable: name, dob, profilePic; plan remains unchanged)
    const updatedProfile = { ...profile };
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setEditMode(false);
  };

  return (
    <div className="profile-page">
      {/* Background Video */}
      <div className="video-container">
        <video loop autoPlay muted className="video-background">
          <source src={Bgm} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Header with Home Button */}
      <header className="profile-header">
        <Link to="/home" className="home-button">Home</Link>
      </header>

      {/* Main Glass Container */}
      <div className="profile-container">
        <h1>My Profile</h1>

        {/* Profile Picture Section */}
        <div className="profile-pic-section">
          {profile.profilePic ? (
            <img src={profile.profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-pic placeholder">No Image</div>
          )}
          {editMode && (
            <>
              <div className="file-controls">
                <label htmlFor="fileInput" className="glass-file-label">Upload Image</label>
                <input 
                  id="fileInput" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="glass-file-input"
                />
                {profile.profilePic && (
                  <button className="remove-pic-button" onClick={removeProfilePic}>
                    Remove Image
                  </button>
                )}
              </div>
              <div className="preset-avatars">
                <p>Select a preset avatar:</p>
                <div className="avatar-grid">
                  {presetAvatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className={`avatar ${profile.profilePic === avatar ? 'selected' : ''}`}
                      onClick={() => selectAvatar(avatar)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Details Section */}
        <div className="profile-details">
          {editMode ? (
            <div className="profile-form">
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={profile.name} 
                onChange={handleChange} 
                className="glass-input"
              />
              <label>Date of Birth:</label>
              <input 
                type="date" 
                name="dob" 
                value={profile.dob} 
                onChange={handleChange} 
                className="glass-input"
              />
              <div className="profile-readonly">
                <p><strong>Plan:</strong> {profile.plan}</p>
              </div>
              <button onClick={handleSave}>Save Profile</button>
            </div>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Date of Birth:</strong> {profile.dob || "Not set"}</p>
              <p><strong>Plan:</strong> {profile.plan}</p>
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          )}
        </div>

        {/* Subscription Details Section (visible only when not in edit mode) */}
        {!editMode && (
          <div className="subscription-section">
            <h2>Subscription Details</h2>
            {profile.plan === "Pro" ? (
              <>
                <p>Your plan includes real-time detection and premium features.</p>
                <p>Expires on: {profile.subscriptionExpiry || "N/A"}</p>
              </>
            ) : profile.plan === "Premium" ? (
              <>
                <p>Your plan includes all premium features including advanced analytics.</p>
                <p>Expires on: {profile.subscriptionExpiry || "N/A"}</p>
              </>
            ) : profile.plan === "Basic" ? (
              <>
                <p>Your Basic plan includes selected premium features.</p>
                <p>Expires on: {profile.subscriptionExpiry || "N/A"}</p>
              </>
            ) : (
              <p>Upgrade to Pro to unlock real-time detection and premium features.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
