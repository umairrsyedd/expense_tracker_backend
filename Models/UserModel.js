const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  Name: String,
  Color: String,
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
  Transactions: mongoose.ObjectId,
  Expenses: mongoose.ObjectId,
  Incomes: mongoose.ObjectId,
});

module.exports = User = mongoose.model("Users", UserSchema);
