const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemToBuySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      min: 0,
    },
    currency: {
      type: String,
      trim: true,
      default: "MMK",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
    purchaseDate: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const ItemToBuy = mongoose.model("ItemToBuy", itemToBuySchema);

module.exports = ItemToBuy;
