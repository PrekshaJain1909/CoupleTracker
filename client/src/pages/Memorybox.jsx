import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Memorybox.css";

export default function MemoryBox({ user }) {
  const [memories, setMemories] = useState([]);
  const [text, setText] = useState("");

  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  // 🌸 Load from localStorage
  useEffect(() => {
    const savedMemories = JSON.parse(localStorage.getItem("simpleMemories") || "[]");
    const savedGoals = JSON.parse(localStorage.getItem("futureGoals") || "[]");
    setMemories(savedMemories);
    setGoals(savedGoals);
  }, []);

  // 💖 Save to localStorage
  useEffect(() => {
    localStorage.setItem("simpleMemories", JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem("futureGoals", JSON.stringify(goals));
  }, [goals]);

  // 💌 Add Memory
  const handleAddMemory = () => {
    if (!text.trim()) {
      Swal.fire("Oops!", "Write a little memory before saving 💕", "warning");
      return;
    }
    const newEntry = { id: Date.now(), text, date: new Date().toLocaleDateString() };
    setMemories([newEntry, ...memories]);
    setText("");
    Swal.fire("Added!", "A new lovely memory has been saved 💖", "success");
  };

  // 🩵 Delete Memory
  const handleDeleteMemory = (id) => {
    Swal.fire({
      title: "Delete this memory?",
      text: "Are you sure? It’s a special one 💔",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e83e8c",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it 💔",
    }).then((result) => {
      if (result.isConfirmed) {
        setMemories(memories.filter((m) => m.id !== id));
        Swal.fire("Deleted!", "Memory removed from your heart 💔", "success");
      }
    });
  };

  // ✏️ Edit Memory
  const handleEditMemory = (id) => {
    const memory = memories.find((m) => m.id === id);
    Swal.fire({
      title: "Edit your memory ✍️",
      input: "text",
      inputValue: memory.text,
      showCancelButton: true,
      confirmButtonText: "Save 💞",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = memories.map((m) =>
          m.id === id ? { ...m, text: result.value } : m
        );
        setMemories(updated);
        Swal.fire("Updated!", "Memory updated beautifully 💐", "success");
      }
    });
  };

  // 🌈 Add Future Goal
  const handleAddGoal = () => {
    if (!newGoal.trim()) {
      Swal.fire("Oops!", "Write a goal before adding 💫", "warning");
      return;
    }
    const updated = [...goals, newGoal];
    setGoals(updated);
    setNewGoal("");
    Swal.fire("Added!", "A new future goal has been saved 💖", "success");
  };

  // ❌ Delete Goal with confirmation
  const handleDeleteGoal = (index) => {
    Swal.fire({
      title: "Delete this goal?",
      text: "Are you sure you want to forget this dream? 💭",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e83e8c",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it 💔",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = goals.filter((_, i) => i !== index);
        setGoals(updated);
        Swal.fire("Deleted!", "Goal removed from your dreams 💔", "success");
      }
    });
  };

  return (
    <div className="tiny-memory-container">
      <h1 className="memory-title">💌 Our Tiny Memory Box</h1>
      <p className="memory-subtitle">
        For all the little moments that made us smile, cry, or love harder 💞
      </p>

      {/* 🌷 Memory Input */}
      <div className="memory-input-area">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a small memory like 'He made me laugh today'..."
        ></textarea>
        <button onClick={handleAddMemory}>💖 Save Memory</button>
      </div>

      {/* 💭 Memory List */}
      <div className="memory-list">
        {memories.length === 0 ? (
          <p className="no-memory">No memories yet... start adding some 💌</p>
        ) : (
          memories.map((m) => (
            <div key={m.id} className="memory-item">
              <p className="memory-text">💭 {m.text}</p>
              <p className="memory-date">{m.date}</p>
              <div className="memory-actions">
                <button onClick={() => handleEditMemory(m.id)}>✏️ Edit</button>
                <button onClick={() => handleDeleteMemory(m.id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🌈 Future Goals Section */}
      <div className="future-goals-section">
        <h2>🌈 Our Future Goals 💫</h2>
        <div className="goal-input">
          <input
            type="text"
            placeholder="Add a new goal together..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <button onClick={handleAddGoal}>Add 💞</button>
        </div>

        <ul className="goal-list">
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <li key={index}>
                {goal}
                <button className="delete-goal" onClick={() => handleDeleteGoal(index)}>
                  ❌
                </button>
              </li>
            ))
          ) : (
            <p className="no-goal">No future goals yet 🌷</p>
          )}
        </ul>
      </div>
    </div>
  );
}
