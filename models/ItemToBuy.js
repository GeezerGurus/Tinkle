const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemToBuySchema = new Schema(
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
    quantity: {
      type: Number,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    price: {
      type: Number,
      min: 0,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ItemToBuy = mongoose.model("ItemToBuy", itemToBuySchema);

module.exports = ItemToBuy;
