/* Routes To be created
Create Expense Category
Edit Expense Category
Delete Expense Category
Create New Expense With Date, Name , Amount, Category , Description
Edit New Expense Date
Edit New Expense Name
Edit New Expense Amount
Edit New Expense Category to Other or Create New 
Edit New Expense Description
Update Balance After Creating or Removing Expense 
Delete Expense 
Store all Expense History In Database
Show History of All Expenses
Last 10 Transactions History 
Daily | Weekly | Monthly Data 
*/
const express = require("express");
const router = express.Router();
const Expense = require("../Models/ExpenseModel");
router.get("/", (req, res) => {
  res.send("Expense Page");
});

router.post("/Create", (req, res) => {
  let { Name, Amount, Category, Description } = req.body;
  const newExpense = new Expense({
    Name,
    Amount,
    Category,
    Description,
  });
  newExpense.save();
});
module.exports = router;
