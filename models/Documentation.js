const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentationSchema = new Schema(
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
    category: {
      type: String,
      trim: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const Documentation = mongoose.model("Documentation", documentationSchema);

module.exports = Documentation;
