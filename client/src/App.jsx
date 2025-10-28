import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import LoveNotes from "./pages/LoveNotes";
import DashboardWelcome from "./pages/DashboardWelcome";
import Timelines from "./pages/Timelines";
import Photos from "./pages/Photos";
import MemoryBox from "./pages/Memorybox";
import Confession from "./pages/confession"; // 🎁 Add this import

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const PrivateRoute = ({ children }) => (user ? children : <Navigate to="/login" replace />);

  return (
    <Router>
      <Routes>
        {/* 🎂 Root route → Confession page */}
        <Route path="/" element={<Confession />} />

        {/* 💌 Login route */}
        <Route
          path="/login"
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />}
        />

        {/* 💞 Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard user={user} onLogout={handleLogout} />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardWelcome />} />
          <Route path="home" element={<Home user={user} />} />
          <Route path="analytics" element={<Analytics user={user} />} />
          <Route
            path="profile"
            element={<Profile user={user} onUpdateProfile={handleUpdateProfile} onLogout={handleLogout} />}
          />
          <Route path="love-notes" element={<LoveNotes user={user} />} />
          <Route path="timelines" element={<Timelines user={user} />} />
          <Route path="photos" element={<Photos user={user} />} />
          <Route path="memorybox" element={<MemoryBox user={user} />} />
        </Route>

        {/* 🩷 Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
