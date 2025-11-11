import React, { useState, useEffect } from "react";

export default function LoveNotes({ entries, onAddNote, onDeleteNote, onEditNote }) {
  const [noteText, setNoteText] = useState("");
  const [who, setWho] = useState("You");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const loveNotes = entries.filter((e) => e.type === "note");

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleAddNote = () => {
    if (!noteText.trim()) return;

    const newNote = {
      id: crypto.randomUUID(),
      who,
      type: "note",
      text: noteText.trim(),
      date: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    };

    onAddNote(newNote);
    setNoteText("");
    setWho("You");
  };

  const handleSaveEdit = (noteId) => {
    if (!editText.trim()) return;
    onEditNote(noteId, editText.trim());
    setEditingId(null);
    setEditText("");
  };

  return (
    <>
      <div className="love-notes">
        <h2>💌 Love Notes</h2>

        {/* Add Note */}
        <div className="add-note-container">
          <select value={who} onChange={(e) => setWho(e.target.value)}>
            <option>You</option>
            <option>Partner</option>
          </select>

          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write a sweet note..."
          />

          <button onClick={handleAddNote}>Add Note</button>
        </div>

        {/* Notes List */}
        {loveNotes.length === 0 ? (
          <p className="no-notes">💔 No love notes yet. Start writing!</p>
        ) : (
          <ul className="notes-list">
            {loveNotes.map((note) => (
              <li key={note.id} className="note-item">
                <div className="note-info">
                  <p className="note-header">
                    {note.date} — <strong>{note.who}</strong>
                  </p>

                  {editingId === note.id ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Edit your note..."
                      />
                      <button
                        className="save-btn"
                        onClick={() => handleSaveEdit(note.id)}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="note-text">{note.text}</p>
                  )}
                </div>

                <div className="note-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(note.id);
                      setEditText(note.text);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteNote(note.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        /* 🌸 Container */
        .love-notes {
          padding: 20px;
          background: linear-gradient(135deg, #fff0f6, #ffe5ef, #fff0f6);
          border-radius: 18px;
          box-shadow: 0 6px 18px rgba(255, 105, 180, 0.25);
          margin: 30px auto;
          max-width: 900px;
          font-family: "Poppins", sans-serif;
          transition: all 0.3s ease;
        }

        .love-notes h2 {
          text-align: center;
          color: #d63384;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 0 1px 3px rgba(214, 51, 132, 0.2);
        }

        /* 💕 Add Note */
        .add-note-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .add-note-container select,
        .add-note-container input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ffafd2;
          font-size: 1rem;
          outline: none;
        }

        .add-note-container select {
          background: #fff0f6;
          color: #d63384;
          font-weight: 600;
        }

        .add-note-container input {
          flex: 1;
          min-width: 200px;
          background: #fff;
        }

        .add-note-container button {
          background: linear-gradient(90deg, #ff77a9, #ff5c9b);
          color: #fff;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-note-container button:hover {
          transform: scale(1.05);
          background: linear-gradient(90deg, #ff5c9b, #ff4081);
        }

        /* 📝 Notes List */
        .notes-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .note-item {
          background: #fff;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(255, 182, 193, 0.25);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .note-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(214, 51, 132, 0.25);
        }

        .note-header {
          font-weight: 600;
          color: #d63384;
        }

        .note-text {
          margin-top: 8px;
          color: #333;
          line-height: 1.4;
        }

        .note-actions {
          display: flex;
          gap: 8px;
          margin-top: 10px;
          justify-content: flex-end;
        }

        /* ✏️ Buttons */
        .edit-btn, .delete-btn, .save-btn, .cancel-btn {
          border: none;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .edit-btn {
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          color: #fff;
        }

        .delete-btn {
          background: linear-gradient(90deg, #ef4444, #b91c1c);
          color: #fff;
        }

        .save-btn {
          background: linear-gradient(90deg, #10b981, #059669);
          color: #fff;
        }

        .cancel-btn {
          background: linear-gradient(90deg, #9ca3af, #6b7280);
          color: #fff;
        }

        .edit-btn:hover, .delete-btn:hover, .save-btn:hover, .cancel-btn:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        /* ✍️ Edit Mode */
        .edit-container {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .edit-container input {
          flex: 1;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #ffd6e8;
        }

        /* 💔 Empty State */
        .no-notes {
          text-align: center;
          color: #999;
          font-style: italic;
          margin-top: 10px;
        }

        /* 📱 Responsive */
        @media (max-width: 768px) {
          .love-notes {
            padding: 16px;
          }

          .love-notes h2 {
            font-size: 1.6rem;
          }

          .add-note-container input {
            min-width: 150px;
          }

          .note-item {
            padding: 12px;
          }

          .note-actions {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .love-notes {
            padding: 12px;
            border-radius: 12px;
          }

          .add-note-container {
            flex-direction: column;
          }

          .add-note-container input,
          .add-note-container select,
          .add-note-container button {
            width: 100%;
          }

          .note-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .note-item {
            font-size: 0.9rem;
          }

          .note-text {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
