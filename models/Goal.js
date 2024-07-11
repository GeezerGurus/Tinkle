const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema (
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
        amount: {
            type: Number,
            required: true,
            trim: true,
            min: 0,
        },
        saveamount: {
            type: Number,
            trim: true,
            min: 0,
            default: 0, 
        },
        description: {
            type: String,
            trim: true,
            maxlength: 200,
        },
        icon: {
            type: String,
            required: true
        },
        desireDate: {
            type: Date,
        },
        state: {
            type: String,
            default: "active"
        },
        color: {
            type: String,
        }
    },
    { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;