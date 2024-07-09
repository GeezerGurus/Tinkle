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
    initial: {
      type: Number,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      //min: [0, "Balance already hits zero!"]
    },
    startDate: {
      type: Date,
      required: function() {
        return this.period === "One Time";
    }
    },
    endDate: {
      type: Date,
      required: function() {
        return this.period === "One Time";
    }
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

budgetSchema.pre('findOneAndDelete', async function(next) {
  const budgetId = this.getFilter()['_id'];
  try {
    await mongoose.model('Record').deleteMany({ budgetId }, { timeout: false });
    next();
  } catch (error) {
    next(error);
  }
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;