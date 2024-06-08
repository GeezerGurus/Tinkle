const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    currency: {
      type: String,
      default: "MMK",
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
