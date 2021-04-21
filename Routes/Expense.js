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
const User = require("../Models/UserModel.js");

router.get("/", (req, res) => {
  const { ID } = req.query;
  User.findById(ID).then((value) => {
    res.send(value.Expenses);
  });
});

router.post("/Create", (req, res) => {
  const { ExpenseCategory, Name, Amount, Note } = req.body;
  const { ID } = req.query;
  let NewExpense = { Name, Amount, ExpenseCategory, Note };
  let NewTransaction = { TransactionType: "Expense", TransactionName: Name };
  User.findByIdAndUpdate(ID, { $push: { Expenses: NewExpense } }).then(
    (success) => {
      NewBalance = Number(success.Balance) - Number(Amount);
      NewTransaction.CurrentBalance = NewBalance;
      User.findByIdAndUpdate(ID, {
        $push: { Transactions: NewTransaction },
      }).then(() => {
        User.findByIdAndUpdate(ID, { Balance: NewBalance }).then();
      });
    }
  );
  res.sendStatus(200);
});

module.exports = router;
