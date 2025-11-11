// Navbar.jsx
import React from "react";

export default function Navbar({ username }) {
  return (
    <div style={styles.navbarContainer}>
      <div style={styles.navbar}>
        <div>
          <h2 style={styles.title}>Welcome, {username || "Lovebirds"} 💕</h2>
          <p style={styles.subtitle}>Stay organized together!</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  navbarContainer: {
    width: "100%",
    background: "linear-gradient(90deg, #800020 0%, #b2224f 100%)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "0 0 20px 20px",
    color: "#fff",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    flexWrap: "wrap", // allows wrapping for small screens
    gap: "8px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffe6ea",
    margin: 0,
  },
  subtitle: {
    fontSize: "14px",
    color: "#ffd6dd",
    margin: 0,
  },
};

// Add responsive styling via media query (optional inline trick)
if (window.innerWidth < 600) {
  styles.title.fontSize = "16px";
  styles.subtitle.fontSize = "12px";
  styles.navbar.padding = "12px 16px";
}
