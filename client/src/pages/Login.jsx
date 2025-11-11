import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both fields, my love 💌");
      return;
    }

    if (email === "Abhisha" && password === "1913") {
      setError("");
      onLogin({ email });
      setEmail("");
      setPassword("");
    } else {
      setError("Oops! That’s not quite right, darling 😅");
    }
  };

  const styles = {
    page: {
      height: "100vh",
      background: "linear-gradient(135deg, #ffe6eb 0%, #ffb6c1 50%, #ff9ec4 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      overflow: "hidden",
      position: "relative",
      padding: "20px",
    },
    container: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "20px",
      boxShadow: "0 8px 25px rgba(255, 105, 180, 0.3)",
      padding: "32px",
      textAlign: "center",
      animation: "fadeIn 1.2s ease",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#e91e63",
      marginBottom: "12px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #f8a1c4",
      borderRadius: "10px",
      marginBottom: "12px",
      outline: "none",
      fontSize: "14px",
      transition: "0.3s",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#e91e63",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "0.3s",
      marginTop: "4px",
    },
    error: {
      color: "red",
      marginBottom: "10px",
      fontSize: "14px",
    },
    heart: {
      fontSize: "32px",
      animation: "beat 1.2s infinite",
    },
    glowText: {
      color: "#e91e63",
      fontSize: "14px",
      marginTop: "18px",
      textShadow: "0 0 10px rgba(255, 105, 180, 0.6)",
    },
    floatingHeart: {
      position: "absolute",
      fontSize: "22px",
      color: "#ff4081",
      animation: "floatUp 6s infinite ease-in",
      opacity: "0.7",
    },

    /* ✅ Responsive adjustments */
    "@media (max-width: 768px)": {
      container: {
        padding: "24px",
        maxWidth: "320px",
      },
      title: {
        fontSize: "24px",
      },
      subtitle: {
        fontSize: "14px",
      },
      button: {
        fontSize: "15px",
        padding: "10px",
      },
    },
    "@media (max-width: 480px)": {
      container: {
        padding: "20px",
        maxWidth: "280px",
      },
      title: {
        fontSize: "20px",
      },
      subtitle: {
        fontSize: "13px",
      },
      input: {
        fontSize: "13px",
        padding: "10px",
      },
      button: {
        fontSize: "14px",
        padding: "10px",
      },
      glowText: {
        fontSize: "13px",
      },
      heart: {
        fontSize: "26px",
      },
    },
  };

  // Floating hearts (randomly placed)
  const hearts = Array.from({ length: 10 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
  }));

  return (
    <div style={styles.page}>
      {hearts.map((h, i) => (
        <span
          key={i}
          style={{
            ...styles.floatingHeart,
            left: h.left,
            top: h.top,
            animationDelay: h.animationDelay,
          }}
        >
          💕
        </span>
      ))}

      <div style={styles.container}>
        <div style={styles.heart}>💖</div>
        <h1 style={styles.title}>Welcome, My Love 💞</h1>
        <p style={styles.subtitle}>Let’s open our secret world together ✨</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Couple Name 💌"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Our secret code 🔐"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Enter Our World 💫
          </button>
        </form>

        <p style={styles.glowText}>You + Me = Forever ♾️</p>
      </div>

      <style>
        {`
          @keyframes beat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0.8; }
            100% { transform: translateY(-120vh); opacity: 0; }
          }

          /* 💕 Responsive styling for inline CSS */
          @media (max-width: 768px) {
            h1 { font-size: 24px !important; }
            p { font-size: 14px !important; }
            input, button { font-size: 15px !important; }
          }

          @media (max-width: 480px) {
            h1 { font-size: 20px !important; }
            input, button { font-size: 14px !important; }
            .heart { font-size: 26px !important; }
          }
        `}
      </style>
    </div>
  );
}
