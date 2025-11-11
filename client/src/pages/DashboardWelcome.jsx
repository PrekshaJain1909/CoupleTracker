import React, { useState } from "react";

export default function DashboardWelcome() {
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.decorBg}></div>
      <div
        style={styles.card}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Image zoom */}
        <div
          style={{
            ...styles.imageContainer,
            transform: hover ? "scale(1.13)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
            zIndex: 1,
            boxShadow: hover ? "0 8px 36px rgba(235, 57, 103, 0.28)" : "none",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80"
            alt="Romantic theme"
            style={styles.image}
          />
        </div>

        {/* Content */}
        <div style={styles.content}>
          <h1
            style={{
              ...styles.title,
              opacity: hover ? 0 : 1,
              transition: "opacity 0.35s ease",
              fontFamily: "'Dancing Script', cursive, 'Poppins', sans-serif",
            }}
          >
            Welcome to Your Cozy Corner 🌹
          </h1>

          <p
            style={{
              ...styles.description,
              fontSize: hover ? "42px" : "18px",
              color: hover ? "#F62459" : "#b03060",
              letterSpacing: hover ? "1.5px" : "0.5px",
              textShadow: hover ? "0 3px 14px #fff0fa" : "none",
              transform: hover ? "translateY(-25px)" : "translateY(0)",
              transition: "all 0.5s ease",
            }}
          >
            {hover
              ? "💕"
              : "Cherish every moment and let this space be your little retreat. Soft light, warm vibes, and gentle memories await here."}
          </p>

          {!hover && <button style={styles.button}>Explore the Moments ✨</button>}
        </div>
      </div>

      {/* Embedded responsive CSS */}
      <style>{responsiveCSS}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at 40% 20%, #fff0f6 0%, #fce4ec 55%, #ffe4ee 100%)",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
    position: "relative",
  },
  decorBg: {
    position: "fixed",
    pointerEvents: "none",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0,
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/hearts.png'), url('https://www.transparenttextures.com/patterns/roses.png')",
    backgroundRepeat: "repeat, repeat",
    opacity: 0.1,
    mixBlendMode: "multiply",
  },
  card: {
    position: "relative",
    background: "linear-gradient(115deg, #ffe4ec 0 40%, #fff0f7 100%)",
    borderRadius: "24px",
    boxShadow: "0 12px 48px rgba(198, 51, 132, 0.08)",
    overflow: "hidden",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
    border: "2.5px solid #fbb1b8",
    zIndex: 2,
    transition: "all 0.3s ease",
  },
  imageContainer: {
    width: "100%",
    height: "300px",
    overflow: "hidden",
    borderRadius: "24px 24px 0 0",
    borderBottom: "2px solid #fbb1b8",
    boxShadow: "0 8px 32px #f8a5c2aa",
    background: "#fff7fa",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "filter 0.3s ease",
    filter: "grayscale(2%) contrast(102%)",
  },
  content: {
    padding: "36px 28px 36px 28px",
    position: "relative",
    zIndex: 2,
  },
  title: {
    fontSize: "32px",
    color: "#c33764",
    fontWeight: "700",
    marginBottom: "18px",
    letterSpacing: "2px",
    textShadow: "0 4px 18px #fff2f7, 0 1px 2px #fcc9d7",
  },
  description: {
    lineHeight: "1.7",
    marginBottom: "28px",
    fontWeight: "400",
  },
  button: {
    background: "radial-gradient(circle at 25% 75%, #f62459 0%, #b7305b 100%)",
    color: "#fff",
    border: "0",
    borderRadius: "25px",
    padding: "14px 38px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 18px #ff5e62aa, 0 1.5px 6px #fbb1b860",
    transition: "all 0.22s cubic-bezier(.61,-0.29,.82,1.32)",
    letterSpacing: ".5px",
    marginTop: "10px",
  },
};

// 🌷 Responsive media queries
const responsiveCSS = `
@media (max-width: 900px) {
  h1 {
    font-size: 28px !important;
  }
  p {
    font-size: 16px !important;
  }
  button {
    padding: 12px 28px !important;
    font-size: 15px !important;
  }
}

@media (max-width: 600px) {
  .container {
    padding: 10px !important;
  }

  div[style*='max-width: 600px'] {
    max-width: 90% !important;
    border-radius: 18px !important;
  }

  h1 {
    font-size: 24px !important;
    line-height: 1.3;
  }

  p {
    font-size: 14px !important;
    line-height: 1.6 !important;
  }

  button {
    width: 100%;
    font-size: 14px !important;
    padding: 12px !important;
    border-radius: 20px !important;
  }

  img {
    height: 220px !important;
  }
}

@media (max-width: 400px) {
  h1 {
    font-size: 20px !important;
  }
  p {
    font-size: 13px !important;
  }
  button {
    font-size: 13px !important;
    padding: 10px 20px !important;
  }
}
`;
