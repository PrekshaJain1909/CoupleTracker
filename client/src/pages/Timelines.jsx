import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./Timelines.css";

export default function Timelines({ user }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "First Date 💐",
      date: "2025-01-15",
      description:
        "The day our eyes met and the world felt softer. Coffee, laughter, and endless conversations that made time stop. ☕💞",
      side: "left",
    },
    {
      id: 2,
      title: "Proposal 💍",
      date: "2025-06-10",
      description:
        "Under the stars, with trembling hands and smiling hearts — we said yes to forever. 🌙✨",
      side: "right",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleAddOrEdit = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.description) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill all fields 💖",
        confirmButtonColor: "#ff69b4",
      });
      return;
    }

    if (editingId) {
      setEvents(events.map((e) => (e.id === editingId ? { ...e, ...newEvent } : e)));
      Swal.fire({
        icon: "success",
        title: "Updated! ✨",
        text: "Your sweet memory has been updated 💞",
        confirmButtonColor: "#ff69b4",
      });
      setEditingId(null);
    } else {
      setEvents([
        ...events,
        {
          id: Date.now(),
          ...newEvent,
          side: events.length % 2 === 0 ? "left" : "right",
        },
      ]);
      Swal.fire({
        icon: "success",
        title: "Added! 💌",
        text: "A new memory has been added to your timeline 💕",
        confirmButtonColor: "#ff69b4",
      });
    }

    setNewEvent({ title: "", date: "", description: "" });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure? 💔",
      text: "You’re about to delete a beautiful memory!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff69b4",
      cancelButtonColor: "#ffc0cb",
      confirmButtonText: "Yes, delete it 💔",
      cancelButtonText: "No, keep it 🥺",
      background: "#fff0f7",
      color: "#ff1493",
    }).then((result) => {
      if (result.isConfirmed) {
        setEvents(events.filter((e) => e.id !== id));
        Swal.fire({
          title: "Deleted 💔",
          text: "That memory has been removed, but never forgotten 💞",
          icon: "success",
          confirmButtonColor: "#ff69b4",
        });
      }
    });
  };

  const handleEdit = (event) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      description: event.description,
    });
    setEditingId(event.id);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...events];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setEvents(updated);
  };

  const moveDown = (index) => {
    if (index === events.length - 1) return;
    const updated = [...events];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setEvents(updated);
  };

  return (
    <div className="timeline-page">
      <HeartRain />
      <h1 className="timeline-heading">💖 Our Love Timeline 💖</h1>
      <p className="timeline-subtext">
        Welcome, {user?.name || "My Love"} — every heartbeat tells our story ✨
      </p>

      {/* Add / Edit Section */}
      <div className="add-section">
        <h2>{editingId ? "💞 Edit Memory" : "💌 Add a New Memory"}</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="timeline-input"
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="timeline-input"
        />
        <textarea
          placeholder="Write your sweet memory here..."
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="timeline-textarea"
        />
        <button onClick={handleAddOrEdit} className="timeline-btn">
          {editingId ? "💫 Update" : "💕 Add Event"}
        </button>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        <AnimatePresence>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className={`timeline-item ${event.side}`}
            >
              <div className="timeline-heart"></div>
              <div className="timeline-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p className="event-description">{event.description}</p>
                <div className="event-actions">
                  <button onClick={() => moveUp(index)}>⬆️ Up</button>
                  <button onClick={() => moveDown(index)}>⬇️ Down</button>
                  <button onClick={() => handleEdit(event)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(event.id)}>🗑️ Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="timeline-line"></div>
      </div>
    </div>
  );
}

function HeartRain() {
  const hearts = Array.from({ length: 25 });
  return (
    <div className="hearts-container">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="falling-heart"
          animate={{
            y: ["-10vh", "110vh"],
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}
