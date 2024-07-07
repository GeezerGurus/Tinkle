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
    const debt = await Debt.findById(debtId);
    if (!debt) {
      return res.status(404).json({ message: "Debt not found!" });
    }
    let TotalAmount = 0
    if (debt.type === "owe") {
      const owes = await OweSchema.find({ debtId });
      if (owes.length > 0) {
        TotalAmount = owes.reduce((total, owe) => total + owe.amount, 0);
      }
    }
    
     else if (debt.type === "lend") {
      const lends = await LendSchema.find({ debtId });
      if (lends.length > 0) {
        TotalAmount = lends.reduce((total, lend) => total + lend.amount, 0);
      }
    }
    debt.amount += TotalAmount;
    await debt.save();

    await mongoose.model('Owe').deleteMany({ debtId });
    await mongoose.model('Lend').deleteMany({ debtId });
    const account = await AccountSchema.findById( debt.accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found!" });
    }
    if (debt.type == "lend") {
      account.balance += debt.amount;
      await account.save();
    }
    if (debt.type == "owe") {
      account.balance -= debt.amount;
      await account.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Debt = mongoose.model("Debt", debtSchema);

module.exports = Debt;
