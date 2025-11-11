import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#800020", "#B2224F", "#FF4D6D", "#A52A2A"];

export default function Dashboard({ entries }) {
  if (!entries || entries.length === 0) {
    return <p style={styles.noEntries}>No entries yet. Add some to see the dashboard.</p>;
  }

  const totals = useMemo(() => {
    return entries.reduce(
      (acc, entry) => {
        if (entry.type === "mistake") acc.mistakes += 1;
        else if (entry.type === "punishment") acc.punishments += 1;
        else if (entry.type === "drink") acc.drinks += entry.count || 0;
        else if (entry.type === "smoke") acc.smokes += entry.count || 0;
        return acc;
      },
      { mistakes: 0, punishments: 0, drinks: 0, smokes: 0 }
    );
  }, [entries]);

  const pieData = useMemo(
    () => [
      { name: "Mistakes", value: totals.mistakes },
      { name: "Punishments", value: totals.punishments },
      { name: "Drinks", value: totals.drinks },
      { name: "Smokes", value: totals.smokes },
    ],
    [totals]
  );

  const barData = useMemo(() => {
    const grouped = entries.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) acc[date] = { mistakes: 0, punishments: 0, drinks: 0, smokes: 0 };
      if (entry.type === "mistake") acc[date].mistakes += 1;
      else if (entry.type === "punishment") acc[date].punishments += 1;
      else if (entry.type === "drink") acc[date].drinks += entry.count || 0;
      else if (entry.type === "smoke") acc[date].smokes += entry.count || 0;
      return acc;
    }, {});
    return Object.keys(grouped)
      .sort()
      .map((date) => ({ date, ...grouped[date] }));
  }, [entries]);

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <h2 style={styles.heading}>Dashboard</h2>

        {/* Totals Section */}
        <div style={styles.totalsGrid}>
          <div style={{ ...styles.totalCard, backgroundColor: "#800020" }}>
            <p style={styles.count}>{totals.mistakes}</p>
            <p style={styles.cardLabel}>Mistakes</p>
          </div>
          <div style={{ ...styles.totalCard, backgroundColor: "#B2224F" }}>
            <p style={styles.count}>{totals.punishments}</p>
            <p style={styles.cardLabel}>Punishments</p>
          </div>
          <div style={{ ...styles.totalCard, backgroundColor: "#FF4D6D" }}>
            <p style={styles.count}>{totals.drinks}</p>
            <p style={styles.cardLabel}>Bottles</p>
          </div>
          <div style={{ ...styles.totalCard, backgroundColor: "#A52A2A" }}>
            <p style={styles.count}>{totals.smokes}</p>
            <p style={styles.cardLabel}>Cigarettes</p>
          </div>
        </div>

        {/* Pie Chart */}
        <h3 style={styles.subHeading}>Overall Distribution</h3>
        <div style={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <h3 style={styles.subHeading}>Daily Stats</h3>
        <div style={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="date" stroke="#800020" />
              <YAxis stroke="#800020" />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="mistakes" fill="#800020" />
              <Bar dataKey="punishments" fill="#B2224F" />
              <Bar dataKey="drinks" fill="#FF4D6D" />
              <Bar dataKey="smokes" fill="#A52A2A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "10px",
  },
  dashboard: {
    padding: "20px",
    backgroundColor: "#fff0f2",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    maxWidth: "950px",
    margin: "auto",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#800020",
    textAlign: "center",
  },
  subHeading: {
    fontWeight: "600",
    marginTop: "24px",
    marginBottom: "12px",
    color: "#800020",
    textAlign: "center",
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
  },
  totalsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },
  totalCard: {
    padding: "16px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  },
  count: {
    fontSize: "clamp(1rem, 2vw, 1.4rem)",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  cardLabel: {
    fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
  },
  chartWrapper: {
    width: "100%",
    height: "auto",
    overflowX: "auto",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(255, 105, 180, 0.15)",
    padding: "10px",
  },
  noEntries: {
    padding: "16px",
    textAlign: "center",
    color: "#800020",
    fontWeight: "500",
  },
};
