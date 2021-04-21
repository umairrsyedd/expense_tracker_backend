const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  Name: String,
  Color: String,
  Amount: {
    type: Number,
    default: 0,
  },
});
const ExpenseSchema = new Schema({
  Date: {
    type: Date,
    default: Date.now,
  },
  Category: String,
  Name: String,
  Amount: Number,
  Note: String,
});
const IncomeSchema = new Schema({
  Date: {
    type: Date,
    default: Date.now,
  },
  Category: String,
  Name: String,
  Amount: Number,
  Note: String,
});
const TransactionSchema = new Schema({
  TransactionType: String,
  TransactionName: String,
  Date: {
    type: Date,
    default: Date.now,
  },
  CurrentBalance: Number,
});

const UserSchema = new Schema({
  Date: {
    type: Date,
    default: Date.now,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Balance: {
    type: Number,
    default: 0,
  },
  IncomeCategory: [CategorySchema],
  ExpenseCategory: [CategorySchema],
  Expenses: [ExpenseSchema],
  Incomes: [IncomeSchema],
  Transactions: [TransactionSchema],
});

module.exports = User = mongoose.model("Users", UserSchema);
