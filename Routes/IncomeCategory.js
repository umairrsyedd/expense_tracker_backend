const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel.js");

router.get("/", (req, res) => {
  const { ID } = req.query;
  User.findById(ID).then((value) => {
    res.send(value.IncomeCategory);
  });
});

router.post("/Create", (req, res) => {
  const { Name, Color } = req.body;
  const { ID } = req.query;
  let NewIncomeCategory = { Name, Color };
  User.findById(ID).then((value) => {
    User.findByIdAndUpdate(ID, {
      $push: { IncomeCategory: NewIncomeCategory },
    }).then();
  });
  res.sendStatus(200);
});

module.exports = router;
