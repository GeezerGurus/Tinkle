const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lendSchema = new Schema(
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
      min: [0, "Balance already hits zero!"]
    },
    Date: {
      type: Date
    }
  },
  { timestamps: true }
);

const Lend = mongoose.model("Lend", lendSchema);

module.exports = Lend;