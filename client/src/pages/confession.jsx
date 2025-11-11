import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BirthdayLoveConfession() {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_7e054a65c7.mp3?filename=romantic-piano-background-music-112199.mp3"
    );
    audio.volume = 0.5;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, []);

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "80px auto",
      padding: "40px",
      background: "rgba(255, 240, 246, 0.9)",
      borderRadius: "24px",
      boxShadow: "0 8px 25px rgba(255, 105, 180, 0.3)",
      textAlign: "center",
      fontFamily: "'Poppins', sans-serif",
      position: "relative",
      overflow: "hidden",
      animation: "fadeIn 2s ease",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#e91e63",
      marginBottom: "10px",
      textShadow: "0 0 10px rgba(255,105,180,0.5)",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#555",
      marginBottom: "24px",
      whiteSpace: "pre-line",
    },
    button: {
      padding: "14px 28px",
      background: "linear-gradient(135deg, #ff5f8f, #ff85c1)",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
      transition: "0.3s ease",
      boxShadow: "0 4px 12px rgba(255, 105, 180, 0.4)",
    },
    confessionBox: {
      animation: "fadeIn 2s ease-in-out",
      fontSize: "1.1rem",
      color: "#333",
      lineHeight: "1.8",
      marginTop: "20px",
      whiteSpace: "pre-line",
    },
    heart: {
      fontSize: "50px",
      color: "#ff3366",
      marginTop: "20px",
      animation: "beat 1.4s infinite",
    },
    cake: { fontSize: "60px" },
    glowHeart: {
      position: "absolute",
      fontSize: "22px",
      color: "#ff5f8f",
      opacity: 0.6,
      animation: "floatHearts 6s linear infinite",
    },
  };

  const FloatingHearts = () =>
    Array.from({ length: 15 }).map((_, i) => (
      <span
        key={i}
        style={{
          ...styles.glowHeart,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
        }}
      >
        💖
      </span>
    ));

  if (opened) {
    return (
      <div style={styles.container} className="birthday-love">
        <FloatingHearts />
        <div style={styles.cake}>🎂</div>
        <h1 style={styles.title}>Happy Birthday, My Love 💞</h1>

        <p style={styles.confessionBox}>
          Every heartbeat whispers your name 💓{"\n"}
          You make my world brighter every single day 🌈{"\n"}
          You're my peace, my chaos, my person 💕{"\n\n"}
          <strong>I love you — truly, completely, endlessly ❤️</strong>{"\n"}
          <em>Happy Birthday, my forever person 💫</em>
        </p>

        <div style={styles.heart}>💞💞💞</div>

        <button
          style={{
            ...styles.button,
            marginTop: "30px",
            background: "linear-gradient(135deg, #ff85c1, #ffb6c1)",
          }}
          onClick={() => navigate("/login")}
        >
          Our Memories 💫
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container} className="birthday-love">
      <FloatingHearts />
      <h1 style={styles.title}>🎉 Happy Birthday! 🎉</h1>
      <p style={styles.subtitle}>
        I’ve prepared something special just for you...{"\n"}
        Click below to open my heart 💌
      </p>

      <button
        style={styles.button}
        onClick={() => setOpened(true)}
        onMouseEnter={(e) =>
          (e.target.style.transform = "scale(1.08) rotate(-1deg)")
        }
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        Open Heart 💌
      </button>
    </div>
  );
}

/* ✅ Animations and Responsiveness */
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
@keyframes floatHearts {
  0% { transform: translateY(0) scale(1); opacity: 0.8; }
  50% { opacity: 1; }
  100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
}

/* 🌸 RESPONSIVE STYLES 🌸 */

@media (max-width: 768px) {
  .birthday-love {
    margin: 40px 20px;
    padding: 28px;
  }
  .birthday-love h1 {
    font-size: 1.6rem !important;
  }
  .birthday-love p {
    font-size: 1rem !important;
  }
  .birthday-love button {
    padding: 12px 20px !important;
    font-size: 0.95rem !important;
  }
  .birthday-love div[style*="font-size: 60px"] {
    font-size: 48px !important;
  }
}

@media (max-width: 480px) {
  .birthday-love {
    margin: 30px 10px;
    padding: 20px;
    border-radius: 18px;
  }
  .birthday-love h1 {
    font-size: 1.4rem !important;
  }
  .birthday-love p {
    font-size: 0.9rem !important;
  }
  .birthday-love button {
    width: 100%;
    padding: 10px 0 !important;
    font-size: 0.9rem !important;
  }
  .birthday-love div[style*="font-size: 50px"] {
    font-size: 38px !important;
  }
  .birthday-love div[style*="font-size: 60px"] {
    font-size: 40px !important;
  }
}

@media (max-width: 360px) {
  .birthday-love {
    padding: 16px;
  }
  .birthday-love h1 {
    font-size: 1.2rem !important;
  }
  .birthday-love p {
    font-size: 0.85rem !important;
  }
}
`;
document.head.appendChild(styleSheet);
