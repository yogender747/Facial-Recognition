// D:\AI\FR\frontend\src\index.js
import React from "react";
import ReactDOM from "react-dom/client";
import Garlic from "./App.js";
import About from "./About.js";
import Pricing from "./Pricing.js";
import Payment from "./Payment.js";
import Signup from "./Signup";
import Login from "./Login";
import Contact from "./Contact"; // Import the Contact Page
import Profile from "./Profile";
import AdminControl from "./AdminControl";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

let root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Garlic />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<AdminControl />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

root.render(<App />);
