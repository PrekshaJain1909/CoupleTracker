import Entry from "../models/Entry.js";

// @desc    Get total counts for Pie chart
// @route   GET /api/stats/totals/:userId
// @access  Private
export const getTotals = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.params.userId });

    const totals = entries.reduce(
      (acc, e) => {
        if (e.type === "mistake") acc.mistakes += 1;
        else if (e.type === "punishment") acc.punishments += 1;
        else if (e.type === "drink") acc.drinks += e.count || 0;
        else if (e.type === "smoke") acc.smokes += e.count || 0;
        else if (e.type === "mood") acc.moods += 1;
        else if (e.type === "note") acc.notes += 1;
        return acc;
      },
      { mistakes: 0, punishments: 0, drinks: 0, smokes: 0, moods: 0, notes: 0 }
    );

    res.json(totals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get daily aggregated data for charts
// @route   GET /api/stats/daily/:userId
// @access  Private
export const getDailyStats = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.params.userId });

    const groupedByDate = entries.reduce((acc, entry) => {
      const date = entry.date.toISOString().slice(0, 10); // YYYY-MM-DD

      if (!acc[date]) {
        acc[date] = { date, mistakes: 0, punishments: 0, drinks: 0, smokes: 0, moods: 0, notes: 0 };
      }

      if (entry.type === "mistake") acc[date].mistakes += 1;
      else if (entry.type === "punishment") acc[date].punishments += 1;
      else if (entry.type === "drink") acc[date].drinks += entry.count || 0;
      else if (entry.type === "smoke") acc[date].smokes += entry.count || 0;
      else if (entry.type === "mood") acc[date].moods += 1;
      else if (entry.type === "note") acc[date].notes += 1;

      return acc;
    }, {});

    const chartData = Object.keys(groupedByDate)
      .sort()
      .map((date) => groupedByDate[date]);

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
