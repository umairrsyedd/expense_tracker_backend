const express = require("express");
const router = express.Router();
const UserModel = require("../Models/UserModel.js");
//Create A New User
router.post("/Create", (req, res) => {
  let { Name, Email, Balance } = req.body;
  const NewUser = new UserModel({
    Name,
    Email,
    IncomeCategory: [{ Name: "Sample", Color: "Blue" }],
  });
  NewUser.save();
  res.send("Done");
});

module.exports = router;
