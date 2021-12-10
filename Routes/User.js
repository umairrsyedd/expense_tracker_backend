const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel.js");
//Create A New User
router.post("/Create", async (req, res) => {
  const { Name, Email, Balance } = req.body;
  const NewUser = new User({
    Name,
    Email,
    Balance,
  });
  try {
    const value = await NewUser.save();
    res.send(value._id);
  } catch (err) {
    res.send(err);
  }
});

router.get("/", async (req, res) => {
  const { Email } = req.query;
  try {
    const FoundUser = await User.findOne({ Email });
    let UserDetails = { ID: FoundUser._id };
    res.send(UserDetails);
  } catch {
    res.send("Error User Not Found");
  }
});

router.patch("/Balance", (req, res) => {
  const { UserID } = req.query;
  const filter = { _id: UserID };
  const query = {
    $set: {
      Balance: 1090,
    },
  };

  User.findOneAndUpdate(filter, query, () => {
    console.log("Updated");
  });
});

module.exports = router;
