import React, { useState, useEffect } from "react";
import AddEntryForm from "../components/AddEntryForm";
import EntryList from "../components/EntryList";
import TodayStats from "../components/TodayStats"; // ✅ Import the new component
import "./Home.css";

export default function Home() {
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("entries")) || [];
  });

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => setEntries((prev) => [entry, ...prev]);

  const deleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const editEntry = (updatedEntry) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === updatedEntry.id ? updatedEntry : e))
    );
  };

  // Filters
  const [typeFilter, setTypeFilter] = useState("all");
  const [personFilter, setPersonFilter] = useState("all");

  const filteredEntries = entries.filter((e) => {
    const typeMatch = typeFilter === "all" || e.type === typeFilter;
    const personMatch = personFilter === "all" || e.who === personFilter;
    return typeMatch && personMatch;
  });

  return (
    <div className="home-container">
      <h1 className="title">Tracker 💕</h1>

      {/* Add Entry */}
      <div className="card entry-form-card">
        <AddEntryForm onAddEntry={addEntry} onEditEntry={editEntry} />
      </div>

      {/* Filters */}
      <div className="card filter-card">
        <div className="filter-group">
          <label className="filter-label">Type:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="mistake">Mistakes</option>
            <option value="punishment">Punishments</option>
            <option value="drink">Drinks</option>
            <option value="smoke">Smokes</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Person:</label>
          <select
            value={personFilter}
            onChange={(e) => setPersonFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="You">You</option>
            <option value="Partner">Partner</option>
          </select>
        </div>
      </div>

      {/* Entry List */}
      <div className="card list-card">
        <EntryList
          entries={filteredEntries}
          onDelete={deleteEntry}
          onEdit={editEntry}
        />
      </div>

      {/* Today's Stats */}
      <TodayStats entries={entries} />
    </div>
  );
}
