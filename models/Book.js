const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
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
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
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
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
