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

          <div className="mood-buttons">
            {MOODS.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.emoji)}
                className={`mood-btn ${selectedMood === mood.emoji ? "selected" : ""}`}
              >
                {mood.emoji}
              </button>
            ))}
          </div>

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
                  <p className="mood-header">
                    {entry.date} - {entry.who}
                  </p>

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
                      <button className="save-btn" onClick={() => handleSaveEdit(entry.id, selectedMood)}>
                        Save
                      </button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="mood-emoji">{entry.mood}</p>
                  )}
                </div>

                <div className="mood-actions">
                  <button className="edit-btn" onClick={() => setEditingId(entry.id)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => onDeleteMood(entry.id)}>
                    Delete
                  </button>
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
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          font-family: "Poppins", sans-serif;
        }

        .mood-tracker h2 {
          font-size: 1.6rem;
          font-weight: bold;
          margin-bottom: 16px;
          text-align: center;
          color: #3b0764;
        }

        /* Mood Selection */
        .mood-selection {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .mood-selection select {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
          width: 100%;
          max-width: 150px;
        }

        .mood-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .mood-btn {
          font-size: 1.6rem;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.3s;
        }

        .mood-btn:hover {
          background-color: #e2e8f0;
        }

        .mood-btn.selected {
          background-color: #e0e7ff;
          border-color: #6366f1;
        }

        .add-mood-btn {
          padding: 10px 20px;
          background-color: #3b82f6;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .add-mood-btn:hover {
          background-color: #2563eb;
        }

        /* Mood Entries */
        .no-moods {
          text-align: center;
          color: #6b7280;
        }

        .mood-list {
          list-style: none;
          padding: 0;
          max-height: 260px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mood-item {
          padding: 14px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: all 0.2s;
        }

        .mood-item:hover {
          background-color: #f9fafb;
        }

        .mood-header {
          font-weight: 600;
          color: #374151;
        }

        .mood-emoji {
          font-size: 2rem;
          margin-top: 4px;
        }

        .mood-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .edit-btn, .delete-btn {
          background: none;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
        }

        .edit-btn {
          color: #3b82f6;
        }
        .edit-btn:hover {
          color: #1d4ed8;
        }

        .delete-btn {
          color: #ef4444;
        }
        .delete-btn:hover {
          color: #b91c1c;
        }

        .edit-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .save-btn, .cancel-btn {
          padding: 6px 10px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }

        .save-btn {
          background-color: #10b981;
          color: white;
        }

        .cancel-btn {
          background-color: #e5e7eb;
          color: #374151;
        }

        @media (min-width: 768px) {
          .mood-selection {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
          }

          .mood-item {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .edit-container {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}
