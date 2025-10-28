import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./EntryList.css";

export default function EntryList({ entries, onDelete, onEdit }) {
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ text: "", deadline: "" });

  const filteredEntries =
    filter === "all" ? entries : entries.filter((e) => e.type === filter);

  const handleSave = (entryId) => {
    const updatedEntry = entries.find((e) => e.id === entryId);
    if (!updatedEntry) return;

    onEdit({
      ...updatedEntry,
      text: editData.text,
      deadline: editData.deadline || null,
    });

    setEditingId(null);
    setEditData({ text: "", deadline: "" });
  };

  const handleToggleComplete = (entry) => {
    onEdit({ ...entry, completed: !entry.completed });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This entry will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#fff0f5",
      backdrop: `rgba(255, 192, 203, 0.4)`,
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your entry has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  return (
    <div className="entry-list">
      {filteredEntries.length === 0 ? (
        <p className="no-entries">No entries found.</p>
      ) : (
        <ul className="entries">
          {filteredEntries.map((entry) => (
            <li
              key={entry.id}
              className={`entry-card ${entry.completed ? "completed" : ""}`}
            >
              <div className="entry-top">
                <input
                  type="checkbox"
                  checked={entry.completed}
                  onChange={() => handleToggleComplete(entry)}
                />
                <div className="entry-details">
                  <div className="entry-header">
                    <span className="who">{entry.who}</span>
                    <span className="created">
                      {entry.createdAt
                        ? new Date(entry.createdAt).toLocaleDateString()
                        : new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>

                  {editingId === entry.id ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        value={editData.text}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            text: e.target.value,
                          }))
                        }
                      />
                      {(entry.type === "mistake" ||
                        entry.type === "punishment") && (
                        <input
                          type="date"
                          value={editData.deadline}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              deadline: e.target.value,
                            }))
                          }
                        />
                      )}
                      <div className="edit-buttons">
                        <button
                          onClick={() => handleSave(entry.id)}
                          className="save-btn"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="entry-text">{entry.text}</div>
                      {entry.count && (
                        <div className="count">Count: {entry.count}</div>
                      )}
                      {(entry.type === "mistake" ||
                        entry.type === "punishment") &&
                        entry.deadline && (
                          <div className="deadline">
                            Deadline: {entry.deadline}
                          </div>
                        )}
                    </>
                  )}
                </div>
                <span className={"badge " + entry.type}>{entry.type}</span>
              </div>

              <div className="entry-bottom">
                <button
                  onClick={() => {
                    setEditingId(entry.id);
                    setEditData({
                      text: entry.text || "",
                      deadline: entry.deadline || "",
                    });
                  }}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
