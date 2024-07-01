const mongoose = require("mongoose");
const { trim } = require("validator");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        accountId: {
            type: Schema.Types.ObjectId,
            ref: "Account",
        },
        fromaccountId: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: function() {
                return this.type === "transfer";
            }
        },
        toaccountId: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: function() {
                return this.type === "transfer";
            }
        },
        budgetId: {
            type: Schema.Types.ObjectId,
            ref: "Budget",
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
            enum: {
                values: ['income', 'expense', 'transfer'],
                message: 'Type is either: income, expense, or transfer'    
            }
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: [0, 'Amount must be a positive number'],
            trim: true
        },
        category: {
            type: String,
            trim: true,
            maxlength: [50, 'Category cannot exceed 50 characters'],
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
            trim: true,
        },
        transactor: {
            type: String,
            trim: true,
            maxlength: [100, 'Payer cannot exceed 100 characters'],
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [200, 'Notes cannot exceed 200 characters'],
        },
    },
    { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;