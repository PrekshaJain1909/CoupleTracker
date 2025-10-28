import React from "react";
import "./TodayStats.css";

export default function TodayStats({ entries }) {
  const today = new Date().toISOString().slice(0, 10);
  const todayEntries = entries.filter((e) => e.date.slice(0, 10) === today);

  // Total counts
  const totalMistakes = todayEntries.filter((e) => e.type === "mistake").length;
  const totalPunishments = todayEntries.filter((e) => e.type === "punishment").length;

  // Divide by person
  const mistakesYou = todayEntries.filter((e) => e.type === "mistake" && e.who === "You");
  const mistakesPartner = todayEntries.filter((e) => e.type === "mistake" && e.who === "Partner");

  const punishmentsYou = todayEntries.filter((e) => e.type === "punishment" && e.who === "You");
  const punishmentsPartner = todayEntries.filter((e) => e.type === "punishment" && e.who === "Partner");

  return (
    <div className="today-stats">
      <h2>Stats 📍</h2>

      <div className="totals">
        <p>Total Mistakes: <strong>{totalMistakes}</strong></p>
        <p>Total Punishments: <strong>{totalPunishments}</strong></p>
      </div>

      {/* Mistakes Table */}
      <div className="stats-table">
        <h3>Mistakes</h3>
        <div className="table-row">
          <div className="table-column">
            <h4>You</h4>
            {mistakesYou.length ? (
              <ul>
                {mistakesYou.map((e) => (
                  <li key={e.id}>{e.text || "No Description"}</li>
                ))}
              </ul>
            ) : <p>None</p>}
          </div>
          <div className="table-column">
            <h4>Partner</h4>
            {mistakesPartner.length ? (
              <ul>
                {mistakesPartner.map((e) => (
                  <li key={e.id}>{e.text || "No Description"}</li>
                ))}
              </ul>
            ) : <p>None</p>}
          </div>
        </div>
      </div>

      {/* Punishments Table */}
      <div className="stats-table">
        <h3>Punishments</h3>
        <div className="table-row">
          <div className="table-column">
            <h4>You</h4>
            {punishmentsYou.length ? (
              <ul>
                {punishmentsYou.map((e) => (
                  <li key={e.id}>{e.text || "No Description"}</li>
                ))}
              </ul>
            ) : <p>None</p>}
          </div>
          <div className="table-column">
            <h4>Partner</h4>
            {punishmentsPartner.length ? (
              <ul>
                {punishmentsPartner.map((e) => (
                  <li key={e.id}>{e.text || "No Description"}</li>
                ))}
              </ul>
            ) : <p>None</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
