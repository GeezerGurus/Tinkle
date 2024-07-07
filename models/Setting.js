const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    default_interval: {
      type: String,
      required: true,
      trim: true,
      default: "monthly"
    },
    hide_dec: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Settings = mongoose.model("Setting", settingsSchema);

module.exports = Settings;