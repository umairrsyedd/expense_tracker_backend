const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel.js");

router.get("/", (req, res) => {
  const { ID } = req.query;
  User.findById(ID).then((value) => {
    res.send(value.ExpenseCategory);
  });
});

router.post("/Create", (req, res) => {
  const { Name, Color } = req.body;
  const { ID } = req.query;
  let NewExpenseCategory = { Name, Color };
  User.findById(ID).then((value) => {
    User.findByIdAndUpdate(ID, {
      $push: { ExpenseCategory: NewExpenseCategory },
    }).then();
  });
  res.sendStatus(200);
});

module.exports = router;
