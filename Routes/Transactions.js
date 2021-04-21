const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel.js");

router.get("/all", (req, res) => {
  const ID = req.query.ID;
  User.findById(ID).then((value) => {
    res.send(value.Transactions);
  });
});

router.get("/recent", (req, res) => {
  const ID = req.query.ID;
  User.findById(ID).then((value) => {
    Transactions = value.Transactions;
    RecentTransactions = Transactions.slice(Math.max(Transactions.length - 5));
    RecentTransactions.reverse();
    res.send(RecentTransactions);
  });
});

module.exports = router;
