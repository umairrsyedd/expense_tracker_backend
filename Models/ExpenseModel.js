const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  Date: {
    type: Date,
    default: Date.now,
  },
  Name: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
  },
  Category: {
    type: String,
  },
  Description: {
    type: String,
  },
});

module.exports = Expense = mongoose.model("ExpenseSchema", ExpenseSchema);
