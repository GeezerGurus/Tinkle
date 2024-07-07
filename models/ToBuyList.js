const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tobuylistSchema = new Schema(
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
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

tobuylistSchema.pre('findOneAndDelete', async function(next) {
  const tobuylistId = this.getFilter()['_id'];
  try {
    await mongoose.model('ItemToBuy').deleteMany({ tobuylistId }, { timeout: false });
    next();
  } catch (error) {
    next(error);
  }
});

const Tobuylist = mongoose.model("Tobuylist", tobuylistSchema);

module.exports = Tobuylist;
