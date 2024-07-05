const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Balance already hits zero!"]
    },
    spent: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Balance already hits zero!"],
      validate: {
        validator: function(value) {
          return value <= this.amount;
        },
        message: "Spent cannot exceed the amount of budget!"
      }
    },
    remain: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    period: {
      type: String,
      required: true,
      maxlength: 10,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;