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

// Wine-red themed colors
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
    <>
      <div style={styles.dashboard}>
        <h2 style={styles.heading}>Dashboard</h2>

        {/* Totals */}
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

        {/* Bar Chart */}
        <h3 style={styles.subHeading}>Daily Stats</h3>
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
    </>
  );
}

const styles = {
  dashboard: {
    padding: "16px",
    backgroundColor: "#fff0f2",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    marginTop: "24px",
    maxWidth: "900px",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#800020",
  },
  subHeading: {
    fontWeight: "600",
    marginTop: "24px",
    marginBottom: "8px",
    color: "#800020",
  },
  totalsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "24px",
  },
  totalCard: {
    padding: "16px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#fff",
  },
  count: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  cardLabel: {
    fontSize: "0.9rem",
  },
  noEntries: {
    padding: "16px",
    textAlign: "center",
    color: "#800020",
    fontWeight: "500",
  },
};
