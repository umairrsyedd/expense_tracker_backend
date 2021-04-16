const express = require("express");
const router = express.Router();
const UserModel = require("../Models/UserModel.js");
const IncomeModel = require("../Models/IncomeModel.js");
const ExpenseModel = require("../Models/ExpenseModel.js");
const TransactionModel = require("../Models/TransactionsModel.js");

//Create A New User
router.post("/Create", (req, res) => {
  const NewIncome = new IncomeModel({});
  const NewExpense = new ExpenseModel({});
  const NewTransaction = new TransactionModel({});
  const NewUser = new UserModel({});
  NewUser.save()
    .then(console.log("User Saved "))
    .then(res.send("User Has Been Saved"));
  NewIncome.save((err, result) => {
    let IncomeID = result._id;
  });
  NewExpense.save((err, result) => {
    let ExpenseID = result._id;
  });
  NewTransaction.save((err, result) => {
    let TransactionID = result._id;
  });
});

module.exports = router;
