const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    payer: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;