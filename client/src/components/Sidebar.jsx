import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart2,
  User,
  LogOut,
  Heart,
  Calendar,
  Image,
  Shield,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar({ onLogout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  // handle resize dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 size={18} /> },
    { name: "Love Notes", path: "/love-notes", icon: <Heart size={18} /> },
    { name: "Timelines", path: "/timelines", icon: <Calendar size={18} /> },
    { name: "Photos", path: "/photos", icon: <Image size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Privacy", path: "/privacy", icon: <Shield size={18} /> },
  ];

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <div style={styles.mobileHeader}>
          <h1 style={styles.mobileHeading}>💞 Couple Tracker</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={styles.menuButton}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      )}

      {/* Sidebar or Drawer */}
      <div
        style={{
          ...styles.sidebar,
          position: isMobile ? "fixed" : "relative",
          height: isMobile ? "100vh" : "100%",
          width: isMobile ? (menuOpen ? "220px" : "0") : "250px",
          overflow: "hidden",
          transition: "width 0.3s ease",
          zIndex: 1000,
        }}
      >
        <h1 style={styles.heading}>💞 Couple Tracker</h1>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navItem,
                backgroundColor: isActive ? "#800020" : "transparent",
                color: isActive ? "#fff" : "#fff0f2",
              })}
              onClick={() => isMobile && setMenuOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <button style={styles.logoutBtn} onClick={onLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Bottom Navbar for Mobile */}
      {isMobile && (
        <div style={styles.bottomNav}>
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.bottomNavItem,
                color: isActive ? "#800020" : "#fff",
              })}
            >
              {item.icon}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}

const styles = {
  sidebar: {
    backgroundColor: "#b2224f",
    color: "#fff0f2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "20px",
    borderBottom: "1px solid #800020",
    color: "#fff",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "8px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "10px",
    textDecoration: "none",
    transition: "all 0.3s ease",
    fontWeight: 500,
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    margin: "16px",
    padding: "10px 0",
    borderRadius: "10px",
    backgroundColor: "#800020",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
  },
  mobileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#b2224f",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1001,
  },
  mobileHeading: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  menuButton: {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#b2224f",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "8px 0",
    boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
    borderTop: "1px solid #800020",
  },
  bottomNavItem: {
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
    transition: "color 0.3s ease",
  },
};
