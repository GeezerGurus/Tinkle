const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OweSchema = require("../models/Owe");
const LendSchema = require("../models/Lend");
const AccountSchema = require("../models/Account");

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
      min: [0, "Balance already hits zero!"],
    },
    Date: {
      type: Date,
      required: true,
    },
    DueDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

debtSchema.pre('findOneAndDelete', async function(next) {
  const debtId = this.getFilter()['_id'];
  try {
    await mongoose.model('Owe').deleteMany({ debtId }, { timeout: false });
    await mongoose.model('Lend').deleteMany({ debtId }, { timeout: false });
    next();
  } catch (error) {
    next(error);
  }
});

const Debt = mongoose.model("Debt", debtSchema);

module.exports = Debt;
