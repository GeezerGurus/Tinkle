const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transferSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fromAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    toAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    currency: {
      type: String,
      trim: true,
      default: "MMK",
    },
    payee: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
