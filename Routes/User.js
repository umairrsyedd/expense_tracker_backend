const express = require("express");
const router = express.Router();
const UserModel = require("../Models/UserModel.js");
//Create A New User
router.post("/Create", (req, res) => {
  const { Name, Email, Balance } = req.body;
  console.log(Balance);
  const NewUser = new UserModel({
    Name,
    Email,
    Balance,
  });
  NewUser.save()
    .then((value) => {
      res.send(value._id);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
