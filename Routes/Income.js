/* Routes To be created
Create Income Category
Edit Income Category
Delete Income Category
Create New Income With Date, Name , Amount, Category , Description
Edit New Income Date
Edit New Income Name
Edit New Income Amount
Edit New Income Category to Other or Create New 
Edit New Income Description
Update Balance After Creating or Removing Income 
Delete Income 
Store all Income History In Database
Show History of All Incomes
Last 10 Transactions History 
Daily | Weekly | Monthly Data 
*/
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Income Page");
});

module.exports = router;
