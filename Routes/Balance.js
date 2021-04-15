/* 
Current User Balance
Log All Transactions and Changes to Balance by Expense or Income
Last 10 Transactions
*/
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Balance Page");
});

module.exports = router;
