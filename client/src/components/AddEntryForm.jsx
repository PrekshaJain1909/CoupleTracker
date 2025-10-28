import React, { useState } from "react";
import "./AddEntryForm.css";

const initialFormData = {
  who: "You",
  type: "mistake",
  text: "",
  count: 1,
  date: new Date().toISOString().slice(0, 10),
  deadline: "",
};

export default function AddEntryForm({ onAddEntry }) {
  const [formData, setFormData] = useState(initialFormData);
  const [loveNote, setLoveNote] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "count" ? Number(value) : value,
    }));
  };

  const handleLoveNoteSubmit = (e) => {
    e.preventDefault();
    if (!loveNote.trim()) return;

    const newNote = {
      id: crypto.randomUUID(),
      who: formData.who,
      type: "loveNote",
      text: loveNote.trim(),
      date: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    };

    onAddEntry(newNote);

    const offlineEntries = JSON.parse(localStorage.getItem("entries")) || [];
    offlineEntries.push(newNote);
    localStorage.setItem("entries", JSON.stringify(offlineEntries));

    setLoveNote("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { type, text, count } = formData;

    if (!text && type !== "drink" && type !== "smoke") return;
    if ((type === "drink" || type === "smoke") && count < 1) return;

    const newEntry = {
      id: crypto.randomUUID(),
      who: formData.who,
      type: formData.type,
      text:
        formData.text ||
        (type === "drink" ? "Drink" : type === "smoke" ? "Smoke" : ""),
      count: type === "drink" || type === "smoke" ? formData.count : null,
      date: formData.date,
      deadline: formData.deadline || null,
      createdAt: new Date().toISOString(),
    };

    onAddEntry(newEntry);

    const offlineEntries = JSON.parse(localStorage.getItem("entries")) || [];
    offlineEntries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(offlineEntries));

    setFormData(initialFormData);
  };

  return (
    <div className="entry-form-wrapper">
      {/* 💌 Love Note Section */}
      <form onSubmit={handleLoveNoteSubmit} className="love-note-form">
        <h3>💖 Add a Love Note</h3>
        <div className="form-row">
          <label>
            Who:
            <select
              name="who"
              value={formData.who}
              onChange={handleChange}
              className="who-select"
            >
              <option>You</option>
              <option>Partner</option>
            </select>
          </label>
        </div>
        <input
          type="text"
          value={loveNote}
          onChange={(e) => setLoveNote(e.target.value)}
          placeholder="Write a sweet love note..."
        />
        <button type="submit" className="add-love-btn">
          Add Love Note
        </button>
      </form>

      {/* 🌸 Normal Entry Section */}
      <form onSubmit={handleSubmit} className="entry-form">
        <h3>📝 Add Entry</h3>

        <div className="form-row">
          <label>
            Who:
            <select name="who" value={formData.who} onChange={handleChange}>
              <option>You</option>
              <option>Partner</option>
            </select>
          </label>

          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="mistake">Mistake</option>
              <option value="punishment">Punishment</option>
              <option value="drink">Drink (bottles)</option>
              <option value="smoke">Smoke (count)</option>
            </select>
          </label>

          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
        </div>

        {(formData.type === "drink" || formData.type === "smoke") && (
          <label>
            {formData.type === "drink" ? "Bottles:" : "Cigarettes:"}
            <input
              type="number"
              name="count"
              min="1"
              value={formData.count}
              onChange={handleChange}
            />
          </label>
        )}

        {(formData.type === "mistake" || formData.type === "punishment") && (
          <label>
            Deadline:
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </label>
        )}

        <label>
          Note:
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder={
              formData.type === "mistake"
                ? "Describe the mistake"
                : "Optional note"
            }
          />
        </label>

        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
}
