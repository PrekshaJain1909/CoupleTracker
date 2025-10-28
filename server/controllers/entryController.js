import Entry from "../models/Entry.js";

// @desc    Get all entries for a user
// @route   GET /api/entries/:userId
// @access  Private
export const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new entry
// @route   POST /api/entries/:userId
// @access  Private
export const addEntry = async (req, res) => {
  try {
    const { type, text, count, mood, who, date } = req.body;

    const entry = new Entry({
      user: req.params.userId,
      type,
      text: text || "",
      count: count || 0,
      mood: mood || "",
      who: who || "You",
      date: date || new Date(),
    });

    const createdEntry = await entry.save();
    res.status(201).json(createdEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an entry by ID
// @route   DELETE /api/entries/:entryId
// @access  Private
export const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    await entry.remove();
    res.json({ message: "Entry removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
