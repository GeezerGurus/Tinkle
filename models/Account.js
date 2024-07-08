const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
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
      maxlength: 50,
    },
    balance: {
      type: Number,
      required: true,
      trim: true,
      //min: [0, "Balance already hits zero!"]
    },
    type: {
      type : String,
      trim : true,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

accountSchema.pre('findOneAndDelete', async function(next) {
  const accountId = this.getFilter()['_id'];
  try {
    const debts = await mongoose.model('Debt').find({ accountId });
    const debtIds = debts.map(debt => debt._id);

    await mongoose.model('Lend').deleteMany({ debtId: { $in: debtIds } }, { timeout: false });
    await mongoose.model('Owe').deleteMany({ debtId: { $in: debtIds } }, { timeout: false });
    await mongoose.model('Debt').deleteMany({ accountId }, { timeout: false });
    await mongoose.model('Record').deleteMany({ accountId }, { timeout: false });
    next();
  } catch (error) {
    next(error);
  }
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;