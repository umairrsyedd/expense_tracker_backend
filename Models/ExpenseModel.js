const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpensesArray = new Schema({
  Date: {
    type: Date,
    default: Date.now,
  },
  Category: String,
  Name: String,
  Amount: Number,
  Note: String,
});

const ExpenseSchema = new Schema({
  ExpensesLog: [ExpensesArray],
});

module.exports = Expense = mongoose.model("Expense", ExpenseSchema);
