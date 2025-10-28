// Navbar.jsx
import React from "react";

export default function Navbar({ username }) {
  return (
    <div style={styles.navbar}>
      <h2 style={styles.title}>
        Welcome, {username || "Lovebirds"} 💕
      </h2>
      <p style={styles.subtitle}>Stay organized together!</p>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    background: "linear-gradient(90deg, #800020 0%, #b2224f 100%)", // wine red gradient
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "0 0 20px 20px",
    color: "#fff",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffe6ea", // light pinkish contrast
  },
  subtitle: {
    fontSize: "14px",
    color: "#ffd6dd", // softer pinkish text
  },
};
