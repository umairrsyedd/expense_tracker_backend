const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel.js");
//Create A New User
router.post("/Create", (req, res) => {
  const { Name, Email, Balance } = req.body;
  const NewUser = new User({
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

router.get("/", (req, res) => {
  const { Email } = req.query;
  User.findOne({ Email })
    .then((FoundUser) => {
      // let UserDetails = { ID: FoundUser._id };
      res.send(FoundUser._id);
    })
    .catch((error) => {
      res.send("User Not Found");
    });
});
