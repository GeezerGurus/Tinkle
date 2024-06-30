const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
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
        icon: {
            type: String,
            required: true,
            trim: true
        },
        color: {
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;