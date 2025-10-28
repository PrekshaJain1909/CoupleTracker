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
        <h2>Love Notes</h2>

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
          <p className="no-notes">No love notes yet.</p>
        ) : (
          <ul className="notes-list">
            {loveNotes.map((note) => (
              <li key={note.id} className="note-item">
                <div className="note-info">
                  <p className="note-header">{note.date} - {note.who}</p>

                  {editingId === note.id ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Edit note"
                      />
                      <button className="save-btn" onClick={() => handleSaveEdit(note.id)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
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
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => onDeleteNote(note.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .love-notes {
          padding: 16px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-top: 24px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .love-notes h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .add-note-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        @media(min-width: 768px) {
          .add-note-container {
            flex-direction: row;
          }
        }

        .add-note-container select,
        .add-note-container input {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .add-note-container select {
          width: 100%;
          max-width: 120px;
        }

        .add-note-container input {
          flex: 1;
        }

        .add-note-container button {
          padding: 8px 16px;
          background-color: #ec4899;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-note-container button:hover {
          background-color: #db2777;
        }

        .no-notes {
          color: #6b7280;
        }

        .notes-list {
          list-style: none;
          padding: 0;
          max-height: 256px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .note-item {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: background-color 0.2s;
        }

        .note-item:hover {
          background-color: #f9f9f9;
        }

        .note-info {
          flex: 1;
        }

        .note-header {
          font-weight: 600;
        }

        .note-text {
          margin-top: 4px;
          color: #374151;
        }

        .edit-container {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }

        .edit-container input {
          flex: 1;
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

        .note-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        @media(min-width: 768px) {
          .note-item {
            flex-direction: row;
            align-items: center;
          }
          .note-actions {
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
