import React, { useState, useEffect } from "react";

// ✅ Optional ErrorBoundary to handle unexpected crashes gracefully
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
        <div className="text-center p-4 bg-red-100 rounded-lg">
          <h2 className="text-lg font-bold text-red-600">
            Something went wrong in LoveNotes 💔
          </h2>
          <p>Try refreshing the page or check your inputs.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function LoveNotes() {
  // ✅ Initialize safely with fallback (avoids undefined/filter crash)
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

  // Save to localStorage on every change
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

    // Update kindness leaderboard
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

  // Safe filtering example (in case you want to filter)
  const recentForgiveness = (forgivenessList || []).slice(-5);

  // Leaderboard sorting
  const sortedLeaderboard = Object.entries(kindnessPoints)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto bg-pink-100 rounded-2xl shadow-lg p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">💖 Love Notes</h1>

      {/* Forgiveness Tracker */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Forgiveness Tracker 🙏</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const apologizer = e.target.apologizer.value.trim();
            const forgiver = e.target.forgiver.value.trim();
            if (!apologizer || !forgiver) return alert("Please fill both names!");
            addForgiveness(apologizer, forgiver);
            e.target.reset();
          }}
          className="flex flex-col gap-2"
        >
          <input
            name="apologizer"
            placeholder="Who apologized?"
            className="p-2 rounded border"
          />
          <input
            name="forgiver"
            placeholder="Who forgave?"
            className="p-2 rounded border"
          />
          <button
            type="submit"
            className="bg-pink-500 text-white rounded p-2 hover:bg-pink-600"
          >
            Add Forgiveness 💞
          </button>
        </form>

        <ul className="mt-4 space-y-2">
          {recentForgiveness.map((item) => (
            <li
              key={item.id}
              className="bg-white p-2 rounded shadow flex justify-between"
            >
              <span>
                <b>{item.apologizer}</b> apologized to <b>{item.forgiver}</b>
              </span>
              <span className="text-sm text-gray-500">{item.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Punishment Generator */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Punishment Generator 🎁</h2>
        <button
          onClick={generatePunishment}
          className="bg-red-400 text-white rounded p-2 hover:bg-red-500"
        >
          Generate Punishment
        </button>
      </section>

      {/* Mood Tracker */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mood Tracker 🪞</h2>
        <div className="flex gap-2 text-2xl">
          {["😊", "🥰", "😢", "😡", "🤗", "😴"].map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`p-2 rounded ${
                mood === m ? "bg-pink-300" : "bg-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <p className="mt-2 text-lg">Current mood: {mood}</p>
      </section>

      {/* Leaderboard */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🌟 Kindness Leaderboard</h2>
        <ul className="space-y-1">
          {sortedLeaderboard.length > 0 ? (
            sortedLeaderboard.map(([name, points]) => (
              <li
                key={name}
                className="bg-white p-2 rounded flex justify-between shadow"
              >
                <span>{name}</span>
                <span>{points} 💫</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No data yet</li>
          )}
        </ul>
      </section>
    </div>
  );
}

// ✅ Wrap with ErrorBoundary for safer rendering
export default function LoveNotesPage() {
  return (
    <ErrorBoundary>
      <LoveNotes />
    </ErrorBoundary>
  );
}
