import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  mistakes: "#FF6384",
  punishments: "#FFCE56",
  drinks: "#36A2EB",
  smokes: "#4BC0C0",
};

export default function StatsGraph({ entries }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="stats-graph empty">
        No data available to display graphs.
        <style>{`
          .stats-graph.empty {
            padding: 16px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-top: 24px;
            text-align: center;
            color: #6b7280;
          }
        `}</style>
      </div>
    );
  }

  const groupedByDate = entries.reduce((acc, entry) => {
    const date = entry.date.slice(0, 10);
    if (!acc[date])
      acc[date] = { date, mistakes: 0, punishments: 0, drinks: 0, smokes: 0 };

    if (entry.type === "mistake") acc[date].mistakes += 1;
    else if (entry.type === "punishment") acc[date].punishments += 1;
    else if (entry.type === "drink") acc[date].drinks += entry.count || 0;
    else if (entry.type === "smoke") acc[date].smokes += entry.count || 0;

    return acc;
  }, {});

  const chartData = Object.keys(groupedByDate)
    .sort()
    .map((date) => groupedByDate[date]);

  return (
    <>
      <div className="stats-graph">
        <h2>Stats Graph</h2>

        <div className="chart-section">
          <h3>Mistakes & Punishments Over Time</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mistakes"
                  stroke={COLORS.mistakes}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="punishments"
                  stroke={COLORS.punishments}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <h3>Drinks & Smokes Over Time</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="drinks" fill={COLORS.drinks} />
                <Bar dataKey="smokes" fill={COLORS.smokes} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style>{`
        .stats-graph {
          padding: 16px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-top: 24px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .stats-graph h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 12px;
          text-align: center;
          color: #800020;
        }

        .stats-graph h3 {
          font-weight: 600;
          margin-bottom: 8px;
          margin-top: 16px;
          text-align: center;
          color: #b2224f;
        }

        .chart-section {
          margin-bottom: 24px;
        }

        .chart-wrapper {
          width: 100%;
          height: 250px;
        }

        /* 📱 Mobile Responsiveness */
        @media (max-width: 768px) {
          .stats-graph {
            padding: 12px;
          }

          .stats-graph h2 {
            font-size: 1.25rem;
          }

          .stats-graph h3 {
            font-size: 1rem;
          }

          .chart-wrapper {
            height: 200px;
          }

          .recharts-legend-wrapper {
            font-size: 0.75rem !important;
          }

          .recharts-tooltip-wrapper {
            font-size: 0.8rem !important;
          }
        }

        /* Small phones */
        @media (max-width: 480px) {
          .stats-graph {
            border-radius: 6px;
          }

          .chart-wrapper {
            height: 180px;
          }

          .stats-graph h2 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}
