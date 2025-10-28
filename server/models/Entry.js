import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["mistake", "punishment", "drink", "smoke", "mood", "note"],
      required: true,
    },
    moodType: {
      type: String,
      enum: ["happy", "sad", "angry", "neutral", "excited", "romantic"],
      default: "neutral",
    },
    count: {
      type: Number,
      default: 0, // for drink/smoke count
    },
    note: {
      type: String, // for love notes or custom text
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);
export default Entry;
