import React, { useState } from "react";
import myPhoto from "../assets/photo.jpg";

export default function DashboardPhoto() {
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.decorBg}></div>

      <div
        style={{
          ...styles.imageContainer,
          transform: hover ? "scale(1.1)" : "scale(1)",
          boxShadow: hover ? "0 10px 36px rgba(198, 51, 132, 0.25)" : "none",
          transition: "all 0.6s ease-in-out",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={myPhoto} alt="Memory" style={styles.image} />
      </div>

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
      "url('https://www.transparenttextures.com/patterns/hearts.png')",
    backgroundRepeat: "repeat",
    opacity: 0.08,
  },
  imageContainer: {
    width: "90%",
    maxWidth: "100vh",
    height: "100vh",
    borderRadius: "25px",
    overflow: "hidden",
    border: "3px solid #fbb1b8",
    background: "#fff",
    boxShadow: "0 6px 18px rgba(255, 105, 180, 0.25)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    borderRadius: "inherit",
    transition: "transform 0.6s ease, filter 0.4s ease",
    filter: "grayscale(2%) contrast(105%)",
  },
};

// 🌸 Responsive styles
const responsiveCSS = `
@media (max-width: 600px) {
  img {
    max-width: 95%;
    border-radius: 20px !important;
  }
}

@media (max-width: 400px) {
  img {
    border-radius: 16px !important;
  }
}
`;
