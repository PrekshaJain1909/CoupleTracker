import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Dashboard.css";

export default function Dashboard({ user, onLogout }) {
  const location = useLocation();

  // Floating hearts animation (randomized 💖💘💞💝💓)
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
      {/* 💗 Existing Navbar (unchanged) */}
      <header className="romantic-header">
        <nav className="romantic-nav">
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
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.button
          className="logout-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={onLogout}
        >
          Logout 💔
        </motion.button>
      </header>

      <main className="romantic-main">
        <Outlet />
      </main>

      {/* 💞 Footer Section */}
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
