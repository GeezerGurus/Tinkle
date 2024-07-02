const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    creator: {
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
    thumbnail: {
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

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
