// src/AdminControl.js
import React, { useState, useEffect } from 'react';
import './AdminControl.css';
import Bgm from './components/bgm.mp4';

function AdminControl() {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [newPlan, setNewPlan] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [visibleUsers, setVisibleUsers] = useState(4); // Initially show 4 users

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    setRegisteredUsers(storedUsers);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchActive(true);
    const storedData = JSON.parse(localStorage.getItem(email));
    if (storedData) {
      setUserData(storedData);
      setNewPlan(storedData.plan);
      setNewExpiry(storedData.subscriptionExpiry || "");
    } else {
      setUserData(null);
      alert("User not found!");
    }
  };

  const handlePlanChange = (e) => {
    setNewPlan(e.target.value);
  };

  const handleExpiryChange = (e) => {
    setNewExpiry(e.target.value);
  };

  const handlePasswordChange = () => {
    if (!newPassword) {
      alert("Enter a new password!");
      return;
    }
    const updatedData = { ...userData, password: newPassword };
    localStorage.setItem(email, JSON.stringify(updatedData));
    setPopupMessage("✅ Password Updated Successfully!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
    setNewPassword('');
  };

  const handleSave = () => {
    if (userData) {
      // Preserve the existing profilePic field along with other fields
      const updatedData = {
        ...userData,
        plan: newPlan,
        subscriptionExpiry: newExpiry,
        profilePic: userData.profilePic, // explicitly preserving the profile picture
      };

      localStorage.setItem(email, JSON.stringify(updatedData));
      localStorage.setItem("userProfile", JSON.stringify(updatedData));
      setUserData(updatedData);
      
      setPopupMessage("✅ User Plan Updated Successfully!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
    }
  };

  const handleDeleteUser = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      localStorage.removeItem(email);
      const updatedUsers = registeredUsers.filter(user => user !== email);
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      setRegisteredUsers(updatedUsers);
      setSearchActive(false);
      setUserData(null);
      setPopupMessage("❌ User Deleted Successfully!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
    }
  };

  const handleBackToUsers = () => {
    setSearchActive(false);
    setUserData(null);
    setEmail('');
  };

  const handleShowMore = () => {
    setVisibleUsers((prev) => prev + 10); // Load 10 more users
  };

  return (
    <div className="admin-page">
      <div className="video-container">
        <video loop autoPlay muted className="video-background">
          <source src={Bgm} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="admin-container">
        {/* Search User Section */}
        <form className="search-form" onSubmit={handleSearch}>
          <label>Enter User Email:</label>
          <input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="glass-input"
            required
          />
          <button type="submit" className="form-button">Search</button>
        </form>

        {userData && (
          <div className="user-details">
            <h2>User Details</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Date of Birth:</strong> {userData.dob || "Not set"}</p>
            <p><strong>Current Plan:</strong> {userData.plan}</p>
            <p><strong>Subscription Expiry:</strong> {userData.subscriptionExpiry || "Not set"}</p>

            <div className="plan-update">
              <label>Change Plan:</label>
              <select value={newPlan} onChange={handlePlanChange} className="glass-input">
                <option value="Free">Free</option>
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Premium">Premium</option>
              </select>
              <label>Set Subscription Expiry:</label>
              <input
                type="date"
                value={newExpiry}
                onChange={handleExpiryChange}
                className="glass-input"
              />
              <div className="button-group">
                <button onClick={handleSave} className="form-button">Save Changes</button>
                <button onClick={handleBackToUsers} className="back-button">Back to Users</button>
              </div>
            </div>

            {/* Change Password Feature */}
            <div className="password-change">
              <label>New Password:</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="glass-input"
              />
              <button onClick={handlePasswordChange} className="password-button">Change Password</button>
            </div>

            {/* Delete User Button */}
            <button onClick={handleDeleteUser} className="delete-button">Delete User</button>
          </div>
        )}

        {/* Registered Users Grid Section */}
        {!searchActive && (
          <div className="registered-users">
            <h2>Registered Users</h2>

            {/* Search Users Feature */}
            <input
              type="text"
              placeholder="Search user by email..."
              className="glass-input search-bar"
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />

            <div className="user-cards-container">
              {registeredUsers
                .filter(user => user.toLowerCase().includes(searchQuery))
                .slice(0, visibleUsers)
                .map((user, index) => {
                  const userData = JSON.parse(localStorage.getItem(user));
                  return (
                    <div className="user-card" key={index}>
                      <div className="user-info">
                        <p><strong>Email:</strong> {user}</p>
                        <p><strong>Plan:</strong> {userData?.plan || "Free"}</p>
                        <p><strong>Expiry Date:</strong> {userData?.subscriptionExpiry || "Not Set"}</p>
                      </div>
                    </div>
                  );
                })}
            </div>

            {visibleUsers < registeredUsers.length && (
              <button onClick={handleShowMore} className="show-more-button">
                Show More
              </button>
            )}
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
}

export default AdminControl;
