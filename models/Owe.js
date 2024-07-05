const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oweSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    debtId: {
        type: Schema.Types.ObjectId,
        ref: "Debt",
        required: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Balance already hits zero!"]
    },
  },
  { timestamps: true }
);

const Owe = mongoose.model("Owe", oweSchema);

module.exports = Owe;