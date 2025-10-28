import React, { useState, useEffect } from "react";

const MOODS = [
  { label: "Happy", emoji: "😊" },
  { label: "Sad", emoji: "😢" },
  { label: "Angry", emoji: "😡" },
  { label: "Excited", emoji: "🤩" },
  { label: "Relaxed", emoji: "😌" },
];

export default function MoodTracker({ entries, onAddMood, onEditMood, onDeleteMood }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [who, setWho] = useState("You");
  const [editingId, setEditingId] = useState(null);

  const moodEntries = entries.filter((e) => e.type === "mood");

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleAddMood = () => {
    if (!selectedMood) return;

    const newMood = {
      id: crypto.randomUUID(),
      who,
      type: "mood",
      mood: selectedMood,
      date: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    };

    onAddMood(newMood);
    setSelectedMood("");
    setWho("You");
  };

  const handleSaveEdit = (id, mood) => {
    onEditMood(id, mood);
    setEditingId(null);
  };

  return (
    <>
      <div className="mood-tracker">
        <h2>Mood Tracker</h2>

        {/* Mood Selection */}
        <div className="mood-selection">
          <select value={who} onChange={(e) => setWho(e.target.value)}>
            <option>You</option>
            <option>Partner</option>
          </select>

          {MOODS.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.emoji)}
              className={`mood-btn ${selectedMood === mood.emoji ? "selected" : ""}`}
            >
              {mood.emoji}
            </button>
          ))}

          <button className="add-mood-btn" onClick={handleAddMood}>
            Add Mood
          </button>
        </div>

        {/* Mood Entries */}
        {moodEntries.length === 0 ? (
          <p className="no-moods">No moods logged yet.</p>
        ) : (
          <ul className="mood-list">
            {moodEntries.map((entry) => (
              <li key={entry.id} className="mood-item">
                <div className="mood-info">
                  <p className="mood-header">{entry.date} - {entry.who}</p>

                  {editingId === entry.id ? (
                    <div className="edit-container">
                      <select
                        value={selectedMood}
                        onChange={(e) => setSelectedMood(e.target.value)}
                      >
                        {MOODS.map((m) => (
                          <option key={m.label} value={m.emoji}>
                            {m.label} {m.emoji}
                          </option>
                        ))}
                      </select>
                      <button className="save-btn" onClick={() => handleSaveEdit(entry.id, selectedMood)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <p className="mood-emoji">{entry.mood}</p>
                  )}
                </div>

                <div className="mood-actions">
                  <button className="edit-btn" onClick={() => setEditingId(entry.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDeleteMood(entry.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .mood-tracker {
          padding: 16px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-top: 24px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .mood-tracker h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .mood-selection {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin-bottom: 16px;
        }

        .mood-selection select {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .mood-btn {
          font-size: 1.5rem;
          padding: 6px 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
          cursor: pointer;
          background: none;
        }

        .mood-btn.selected {
          background-color: #e5e7eb;
        }

        .add-mood-btn {
          padding: 8px 16px;
          background-color: #3b82f6;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-mood-btn:hover {
          background-color: #2563eb;
        }

        .no-moods {
          color: #6b7280;
        }

        .mood-list {
          list-style: none;
          padding: 0;
          max-height: 256px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mood-item {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: background-color 0.2s;
        }

        .mood-item:hover {
          background-color: #f9f9f9;
        }

        .mood-info {
          flex: 1;
        }

        .mood-header {
          font-weight: 600;
        }

        .mood-emoji {
          font-size: 2rem;
          margin-top: 4px;
        }

        .edit-container {
          display: flex;
          gap: 8px;
          margin-top: 4px;
          align-items: center;
        }

        .edit-container select {
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .save-btn {
          background-color: #10b981;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          cursor: pointer;
        }

        .save-btn:hover {
          background-color: #059669;
        }

        .cancel-btn {
          background-color: #d1d5db;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background-color: #9ca3af;
        }

        .mood-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        @media(min-width: 768px) {
          .mood-item {
            flex-direction: row;
            align-items: center;
          }
          .mood-actions {
            margin-top: 0;
          }
        }

        .edit-btn {
          color: #3b82f6;
          font-weight: bold;
          background: none;
          border: none;
          cursor: pointer;
        }

        .edit-btn:hover {
          color: #1d4ed8;
        }

        .delete-btn {
          color: #ef4444;
          font-weight: bold;
          background: none;
          border: none;
          cursor: pointer;
        }

        .delete-btn:hover {
          color: #b91c1c;
        }
      `}</style>
    </>
  );
}
