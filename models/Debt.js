const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debtSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: {
          values: ['lend', 'owe'],
          message: 'Type is either: lend or owe'    
      }
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountId: {
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
    purpose: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    Date: {
      type: Date,
      required: true,
    },
    DueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Debt = mongoose.model("Debt", debtSchema);

module.exports = Debt;
