const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    author: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    category: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    link: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    coverImage: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    favourite: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
