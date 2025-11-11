import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 💞 ErrorBoundary for crash safety
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Error in LoveNotes:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          <h2>Something went wrong 💔</h2>
          <p>Try refreshing the page 💫</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function LoveNotes() {
  const [forgivenessList, setForgivenessList] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("forgivenessList") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [mood, setMood] = useState("😊");
  const [kindnessPoints, setKindnessPoints] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("kindnessPoints") || "{}");
    return saved || {};
  });

  const punishments = [
    "Write a love letter 💌",
    "Buy a chocolate 🍫",
    "Movie night together 🎬",
    "Cook for each other 🍝",
    "Long walk holding hands 🌙",
    "Say 5 things you love about them ❤️",
  ];

  useEffect(() => {
    localStorage.setItem("forgivenessList", JSON.stringify(forgivenessList));
  }, [forgivenessList]);

  useEffect(() => {
    localStorage.setItem("kindnessPoints", JSON.stringify(kindnessPoints));
  }, [kindnessPoints]);

  const addForgiveness = (apologizer, forgiver) => {
    const newEntry = {
      id: Date.now(),
      apologizer,
      forgiver,
      date: new Date().toLocaleString(),
    };
    const updated = [...forgivenessList, newEntry];
    setForgivenessList(updated);

    setKindnessPoints((prev) => ({
      ...prev,
      [forgiver]: (prev[forgiver] || 0) + 2,
      [apologizer]: (prev[apologizer] || 0) + 1,
    }));
  };

  const generatePunishment = () => {
    const random = punishments[Math.floor(Math.random() * punishments.length)];
    alert(`💥 Punishment: ${random}`);
  };

  const recentForgiveness = (forgivenessList || []).slice(-5);
  const sortedLeaderboard = Object.entries(kindnessPoints)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(to bottom right, #f9c5d1, #fddde6, #fbc2eb);
          font-family: 'Poppins', sans-serif;
        }
        .container {
          max-width: 650px;
          margin: 3rem auto;
          background: linear-gradient(to bottom right, #fff5f7, #ffe6eb);
          border-radius: 25px;
          padding: 2.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          color: #e91e63;
          font-weight: 800;
          margin-bottom: 1.5rem;
          text-shadow: 1px 1px 2px #fff;
        }
        h2 {
          color: #d81b60;
          margin-bottom: 1rem;
          font-size: 1.4rem;
        }
        .section {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 15px;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .form-input {
          padding: 0.8rem;
          border-radius: 10px;
          border: 1px solid #f48fb1;
          width: 100%;
          margin-bottom: 0.8rem;
          font-size: 1rem;
        }
        .form-btn {
          background-color: #ec407a;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 0.8rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .form-btn:hover {
          background-color: #d81b60;
          transform: scale(1.05);
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          background: linear-gradient(to right, #ffe5ec, #ffd6e0);
          padding: 0.8rem 1rem;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          box-shadow: 0 3px 5px rgba(0,0,0,0.05);
        }
        .punish-btn {
          background-color: #f06292;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 0.8rem 1rem;
          cursor: pointer;
          font-weight: bold;
          transition: 0.3s;
        }
        .punish-btn:hover {
          background-color: #ec407a;
          transform: scale(1.05);
        }
        .moods {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .mood-btn {
          font-size: 2rem;
          background: white;
          border: none;
          border-radius: 10px;
          padding: 10px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .mood-btn.active {
          background-color: #f8bbd0;
          border: 2px solid #f06292;
        }
        .leaderboard-item {
          background: linear-gradient(to right, #ffe5f1, #ffd6e0);
          padding: 0.8rem 1rem;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          font-weight: 500;
        }
        .leaderboard-item:first-child {
          background: linear-gradient(to right, #f48fb1, #f06292);
          color: white;
        }
        .error-box {
          text-align: center;
          padding: 1.5rem;
          background: #ffcdd2;
          border-radius: 15px;
          color: #b71c1c;
          font-weight: bold;
        }
      `}</style>

      <motion.div
        className="container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>💖 Love Notes 💖</h1>

        {/* Forgiveness Tracker */}
        <section className="section">
          <h2>Forgiveness Tracker 🙏</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const apologizer = e.target.apologizer.value.trim();
              const forgiver = e.target.forgiver.value.trim();
              if (!apologizer || !forgiver)
                return alert("Please fill both names!");
              addForgiveness(apologizer, forgiver);
              e.target.reset();
            }}
          >
            <input
              name="apologizer"
              placeholder="Who apologized? 💭"
              className="form-input"
            />
            <input
              name="forgiver"
              placeholder="Who forgave? 💕"
              className="form-input"
            />
            <button type="submit" className="form-btn">
              Add Forgiveness 💞
            </button>
          </form>

          <ul>
            {recentForgiveness.map((item) => (
              <li key={item.id}>
                <span>
                  <b>{item.apologizer}</b> apologized to <b>{item.forgiver}</b>
                </span>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Punishment Generator */}
        <section className="section">
          <h2>Punishment Generator 🎁</h2>
          <button className="punish-btn" onClick={generatePunishment}>
            Generate Punishment 💥
          </button>
        </section>

        {/* Mood Tracker */}
        <section className="section">
          <h2>Mood Tracker 🪞</h2>
          <div className="moods">
            {["😊", "🥰", "😢", "😡", "🤗", "😴"].map((m) => (
              <button
                key={m}
                className={`mood-btn ${mood === m ? "active" : ""}`}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "10px", fontSize: "1.1rem" }}>
            Current mood: <span style={{ color: "#e91e63" }}>{mood}</span>
          </p>
        </section>

        {/* Leaderboard */}
        <section className="section">
          <h2>🌟 Kindness Leaderboard 🌟</h2>
          <ul>
            {sortedLeaderboard.length > 0 ? (
              sortedLeaderboard.map(([name, points], index) => (
                <li key={name} className="leaderboard-item">
                  <span>{name}</span>
                  <span>{points} 💫</span>
                </li>
              ))
            ) : (
              <li style={{ textAlign: "center", color: "#888" }}>
                No data yet 💭
              </li>
            )}
          </ul>
        </section>
      </motion.div>
    </>
  );
}

export default function LoveNotesPage() {
  return (
    <div>
      <ErrorBoundary>
        <LoveNotes />
      </ErrorBoundary>
    </div>
  );
}
