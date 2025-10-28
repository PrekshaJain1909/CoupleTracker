import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import "./Analytics.css";

export default function CalendarTracker() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [alcoholData, setAlcoholData] = useState({});
  const [cigaretteData, setCigaretteData] = useState({});

  // Load data
  useEffect(() => {
    const savedAlcohol = JSON.parse(localStorage.getItem("alcoholData")) || {};
    const savedCigarette = JSON.parse(localStorage.getItem("cigaretteData")) || {};
    setAlcoholData(savedAlcohol);
    setCigaretteData(savedCigarette);
  }, []);

  // Save data
  useEffect(() => localStorage.setItem("alcoholData", JSON.stringify(alcoholData)), [alcoholData]);
  useEffect(() => localStorage.setItem("cigaretteData", JSON.stringify(cigaretteData)), [cigaretteData]);

  const handleChange = (data, setData) => (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: Number(value) || 0 }));
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getColor = (value, max, baseColor) => {
    if (value === 0) return "#f2f2f2";
    const opacity = Math.max(0.3, value / max);
    return `${baseColor}${Math.floor(opacity * 255).toString(16).padStart(2, "0")}`;
  };

  // ✅ Export to Excel (combined daily data)
  const handleExport = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const exportData = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const day = i.toString().padStart(2, "0");
      const dateKey = `${year}-${month + 1}-${day}`;
      const alcohol = alcoholData[dateKey] || 0;
      const cigarette = cigaretteData[dateKey] || 0;

      exportData.push({
        Date: dateKey,
        "Alcohol Consumed": alcohol,
        "Cigarettes Smoked": cigarette,
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Health Tracker");

    XLSX.writeFile(workbook, `HealthTracker_${year}_${month + 1}.xlsx`);

    Swal.fire({
      icon: "success",
      title: "Excel Exported Successfully!",
      text: "Your daily Alcohol & Cigarette record has been saved 💾",
      confirmButtonColor: "#ff4d94",
    });
  };

  const renderCalendar = (data, setData, baseColor, type) => {
    const daysInMonth = getDaysInMonth(year, month);
    const today = new Date();
    const maxCount = Math.max(...Object.values(data), 1);
    const total = Array.from({ length: daysInMonth }).reduce((acc, _, i) => {
      const day = (i + 1).toString().padStart(2, "0");
      return acc + (data[`${year}-${month + 1}-${day}`] || 0);
    }, 0);

    return (
      <div className="calendar-card">
        <div className="calendar-grid">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = (i + 1).toString().padStart(2, "0");
            const key = `${year}-${month + 1}-${day}`;
            const value = data[key] || 0;

            const dateObj = new Date(year, month, i + 1);
            const isToday =
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === i + 1;
            const isFuture = dateObj > today;

            const bgColor = isFuture ? "#e0e0e0" : getColor(value, maxCount, baseColor);

            return (
              <div
                key={key}
                className={`calendar-cell ${isToday ? "today" : ""} ${isFuture ? "future" : ""}`}
                style={{ backgroundColor: bgColor }}
                title={`${type}: ${value}`}
              >
                <span className="day-label">{day}</span>
                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={handleChange(data, setData)}
                  min="0"
                  disabled={isFuture}
                  className="day-input"
                />
              </div>
            );
          })}
        </div>
        <div className="calendar-total">
          Total {type}: <strong>{total}</strong>
        </div>
      </div>
    );
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="calendar-tracker">
      {/* 🔹 Header with Export Button */}
      <div className="tracker-header">
        <div className="month-year-selector">
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {months.map((m, idx) => (
              <option key={idx} value={idx}>
                {m}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min="2000"
            max="2100"
          />
        </div>

        <button className="export-btn" onClick={handleExport}>
          📊 Export to Excel
        </button>
      </div>

      <h2>🍷 Alcohol Tracker</h2>
      {renderCalendar(alcoholData, setAlcoholData, "#ff4d4d", "Alcohol")}

      <h2>🚬 Cigarette Tracker</h2>
      {renderCalendar(cigaretteData, setCigaretteData, "#4da6ff", "Cigarettes")}
    </div>
  );
}
