import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Dashboard.css";

export default function Dashboard({ user, onLogout }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Floating hearts animation
  useEffect(() => {
    const heartEmojis = ["💖", "💞", "💘", "💝", "💓", "💕", "❤️"];
    const container = document.createElement("div");
    container.className = "floating-hearts";
    document.body.appendChild(container);

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerText =
        heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 4 + Math.random() * 3 + "s";
      heart.style.fontSize = 16 + Math.random() * 20 + "px";
      heart.style.opacity = Math.random() * 0.6 + 0.4;
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 7000);
    }, 500);

    return () => {
      clearInterval(interval);
      container.remove();
    };
  }, []);

  const base = "/dashboard";
  const navItems = [
    { name: "💌 Confession", path: "/confession" },
    { name: "🏠 Home", path: `${base}/home` },
    { name: "📝 LoveNotes", path: `${base}/love-notes` },
    { name: "💞 Timelines", path: `${base}/timelines` },
    { name: "📊 Analytics", path: `${base}/analytics` },
    { name: "📷 Photos", path: `${base}/photos` },
    { name: "🎁 MemoryBox", path: `${base}/memorybox` },
  ];

  return (
    <div className="dashboard-container">
      {/* 💗 Navbar */}
      <header className="romantic-header">
        <div className="nav-header">
          <h2 className="brand-title">💖 Our LoveSpace 💖</h2>

          {/* Hamburger Icon */}
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav className={`romantic-nav ${menuOpen ? "show" : ""}`}>
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`nav-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

          <motion.button
            className="logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={onLogout}
          >
            Logout 💔
          </motion.button>
        </nav>
      </header>

      {/* 💕 Main */}
      <main className="romantic-main">
        <Outlet />
      </main>

      {/* 💞 Footer */}
      <footer className="romantic-footer">
        <div className="footer-text">
          <p>💖 Made with endless love by {user?.name} & their forever person 💖</p>
          <p>Every memory here is a piece of our heart 💌</p>
        </div>

        <div className="footer-extra-lines">
          <p>🕊️ Promise me, no matter where life takes us, we’ll never stop writing our story 💞</p>
          <p>🌌 Every heartbeat here belongs to our tomorrow 💫</p>
        </div>

        <div className="footer-extra-lines">
          <p>💞 Here’s to our future chapters — full of laughter, love, and endless cuddles 🐻</p>
          <p>✨ Even when we forget, this page will remember for us 💖</p>
        </div>
      </footer>
    </div>
  );
}
