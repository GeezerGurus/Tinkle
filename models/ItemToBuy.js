const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemToBuySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tobuylistId: {
      type: Schema.Types.ObjectId,
      ref: "ToBuyList",
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
    ispurchased: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const ItemToBuy = mongoose.model("ItemToBuy", itemToBuySchema);

module.exports = ItemToBuy;
