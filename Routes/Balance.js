/* 
Current User Balance
Log All Transactions and Changes to Balance by Expense or Income
Last 10 Transactions
*/
const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel.js");

router.get("/", (req, res) => {
  const { ID } = req.query;
  User.findById(ID).then((value) => {
    res.send(`${value.Balance}`); // Couldn't Send Number Directly as not Allowed (Statuses Only)
  });
});

module.exports = router;
