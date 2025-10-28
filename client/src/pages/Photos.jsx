import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import "./Photos.css";

export default function Photos({ user }) {
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState({
    title: "",
    date: "",
    description: "",
    image: "",
    category: "Sweet Moment",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("memories") || "[]");
    setMemories(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("memories", JSON.stringify(memories));
  }, [memories]);

  const handleAdd = () => {
    if (!newMemory.title || !newMemory.date || !newMemory.description) {
      Swal.fire("Oops!", "Please fill all fields before saving 💞", "warning");
      return;
    }
    const updated = [...memories, { ...newMemory, id: Date.now() }];
    setMemories(updated);
    setNewMemory({
      title: "",
      date: "",
      description: "",
      image: "",
      category: "Sweet Moment",
    });
    Swal.fire("Added!", "Your beautiful memory is saved 💖", "success");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this memory?",
      text: "Are you sure? This moment is precious 💔",
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

  const handleEdit = (id) => {
    const mem = memories.find((m) => m.id === id);
    Swal.fire({
      title: "Edit your memory ✍️",
      html: `
        <input id="swal-title" class="swal2-input" value="${mem.title}">
        <input id="swal-date" type="date" class="swal2-input" value="${mem.date}">
        <textarea id="swal-desc" class="swal2-textarea" placeholder="Memory description...">${mem.description}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save 💞",
      preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const date = document.getElementById("swal-date").value;
        const description = document.getElementById("swal-desc").value;
        return { title, date, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = memories.map((m) =>
          m.id === id ? { ...m, ...result.value } : m
        );
        setMemories(updated);
        Swal.fire("Saved!", "Your memory has been updated 💐", "success");
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setNewMemory({ ...newMemory, image: reader.result });
    reader.readAsDataURL(file);
  };

  const categories = [
    "Sweet Moment",
    "Travel Memory",
    "Funny Time",
    "Anniversary",
    "Surprise",
    "Promise",
  ];

  return (
    <div className="memory-container">
      {/* Floating hearts background */}
      <div className="hearts-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              fontSize: `${12 + Math.random() * 20}px`,
            }}
            animate={{
              y: [600, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      <div className="memory-header">
        <h1>💌 Photos</h1>
        <p>
          Relive your sweetest memories together, {user?.name || "Lovebird"} 💕
        </p>
      </div>

      {/* Add New Memory */}
      <div className="memory-form">
        <input
          type="text"
          placeholder="Title"
          value={newMemory.title}
          onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
        />
        <input
          type="date"
          value={newMemory.date}
          onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
        />
        <textarea
          placeholder="Write your memory here..."
          value={newMemory.description}
          onChange={(e) =>
            setNewMemory({ ...newMemory, description: e.target.value })
          }
        />
        <select
          value={newMemory.category}
          onChange={(e) =>
            setNewMemory({ ...newMemory, category: e.target.value })
          }
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <label className="file-label">
          📸 Upload Memory Photo 💞
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>

        <button onClick={handleAdd}>💖 Add Memory</button>
      </div>

      {/* Memory Cards */}
      <div className="memory-grid">
        <AnimatePresence>
          {memories
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((m) => (
              <motion.div
                key={m.id}
                className="memory-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {m.image && <img src={m.image} alt={m.title} />}
                <h3>{m.title}</h3>
                <p className="date">{m.date}</p>
                <p>{m.description}</p>
                <p className="category">💞 {m.category}</p>
                <div className="actions">
                  <button className="edit" onClick={() => handleEdit(m.id)}>
                    ✏️ Edit
                  </button>
                  <button className="delete" onClick={() => handleDelete(m.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
