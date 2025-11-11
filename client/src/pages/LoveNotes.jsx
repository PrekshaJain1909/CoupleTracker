import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

    MySwal.fire({
      icon: "success",
      title: "Forgiveness Added 💞",
      text: `${apologizer} apologized to ${forgiver}! Kindness points updated ✨`,
      background: "#fff0f6",
      confirmButtonColor: "#ec4899",
    });
  };

  const generatePunishment = () => {
    const random = punishments[Math.floor(Math.random() * punishments.length)];
    MySwal.fire({
      icon: "info",
      title: "💥 Punishment Time!",
      text: random,
      background: "#fff0f6",
      confirmButtonColor: "#ec4899",
    });
  };

  const recentForgiveness = (forgivenessList || []).slice(-5);
  const sortedLeaderboard = Object.entries(kindnessPoints)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <motion.div
      className="love-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="title">💖 Love Notes 💖</h1>

      {/* Forgiveness Tracker */}
      <section className="card">
        <h2 className="section-title">Forgiveness Tracker 🙏</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const apologizer = e.target.apologizer.value.trim();
            const forgiver = e.target.forgiver.value.trim();
            if (!apologizer || !forgiver) {
              MySwal.fire({
                icon: "warning",
                title: "Oops 😅",
                text: "Please fill both names!",
                confirmButtonColor: "#ec4899",
              });
              return;
            }
            addForgiveness(apologizer, forgiver);
            e.target.reset();
          }}
          className="form"
        >
          <input name="apologizer" placeholder="Who apologized? 💭" className="input" />
          <input name="forgiver" placeholder="Who forgave? 💕" className="input" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn"
            type="submit"
          >
            Add Forgiveness 💞
          </motion.button>
        </form>

        <ul className="list">
          {recentForgiveness.map((item) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="list-item"
            >
              <span>
                <b>{item.apologizer}</b> apologized to <b>{item.forgiver}</b>
              </span>
              <span className="date">{item.date}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Punishment Generator */}
      <section className="card">
        <h2 className="section-title">Punishment Generator 🎁</h2>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 1 }}
          className="punish-btn"
          onClick={generatePunishment}
        >
          Generate Punishment 💥
        </motion.button>
      </section>

      {/* Mood Tracker */}
      <section className="card">
        <h2 className="section-title">Mood Tracker 🪞</h2>
        <div className="emoji-row">
          {["😊", "🥰", "😢", "😡", "🤗", "😴"].map((m) => (
            <motion.button
              key={m}
              whileHover={{ scale: 1.2 }}
              onClick={() => setMood(m)}
              className={`emoji ${mood === m ? "active" : ""}`}
            >
              {m}
            </motion.button>
          ))}
        </div>
        <p className="mood-text">
          Current mood: <span>{mood}</span>
        </p>
      </section>

      {/* Leaderboard */}
      <section className="card">
        <h2 className="section-title text-center">🌟 Kindness Leaderboard 🌟</h2>
        <ul className="list">
          {sortedLeaderboard.length > 0 ? (
            sortedLeaderboard.map(([name, points], index) => (
              <motion.li
                key={name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`leader-item ${index === 0 ? "top" : ""}`}
              >
                <span>{name}</span>
                <span>{points} 💫</span>
              </motion.li>
            ))
          ) : (
            <li className="no-data">No data yet 💭</li>
          )}
        </ul>
      </section>
    </motion.div>
  );
}

export default function LoveNotesPage() {
  return (
    <div className="page">
      <ErrorBoundary>
        <LoveNotes />
      </ErrorBoundary>
    </div>
  );
}

/* 🌸 Internal CSS */
const style = document.createElement("style");
style.textContent = `
  .page {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #fbcfe8, #fce7f3, #f9a8d4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  .love-container {
    max-width: 700px;
    width: 100%;
    background: linear-gradient(135deg, #fef2f2, #fce7f3);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  .title {
    text-align: center;
    font-size: 2.5rem;
    color: #ec4899;
    margin-bottom: 1.5rem;
  }
  .card {
    background: rgba(255,255,255,0.8);
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    margin-bottom: 1.5rem;
  }
  .section-title {
    color: #db2777;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  .form { display: flex; flex-direction: column; gap: 0.75rem; }
  .input {
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #f9a8d4;
    font-size: 1rem;
  }
  .btn {
    background: #ec4899;
    color: white;
    padding: 0.75rem;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }
  .list { margin-top: 1rem; list-style: none; padding: 0; }
  .list-item {
    display: flex; justify-content: space-between;
    background: linear-gradient(to right, #fce7f3, #fbcfe8);
    border-radius: 8px; padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
  }
  .date { color: gray; font-size: 0.85rem; }
  .punish-btn {
    background: #f87171; color: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    border: none; cursor: pointer;
  }
  .emoji-row { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
  .emoji { font-size: 2rem; background: white; border-radius: 8px; padding: 0.5rem; cursor: pointer; }
  .emoji.active { background: #f9a8d4; border: 2px solid #ec4899; }
  .mood-text { text-align: center; margin-top: 0.75rem; color: #4b5563; font-weight: 500; }
  .leader-item {
    display: flex; justify-content: space-between;
    background: linear-gradient(to right, #fce7f3, #fbcfe8);
    border-radius: 8px; padding: 0.5rem 1rem;
  }
  .leader-item.top {
    background: linear-gradient(to right, #f472b6, #ec4899);
    color: white;
  }
  .no-data { text-align: center; color: gray; font-style: italic; }
  .error-box {
    text-align: center;
    background: #fee2e2;
    color: #b91c1c;
    padding: 1rem;
    border-radius: 12px;
  }
`;
document.head.appendChild(style);
