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

// Reads All The Expenses
router.get("/", (req, res) => {
  const { ID } = req.query;
  User.findById(ID).then((value) => {
    res.send(value.Expenses);
  });
});
// Reads All Recent Expenses [5]
router.get("/recent", (req, res) => {
  const { ID } = req.query;
  User.findById(ID).then((value) => {
    Expenses = value.Expenses;
    RecentExpenses = Expenses.slice(Math.max(Expenses.length - 5));
    RecentExpenses.reverse();
    res.send(RecentExpenses);
  });
});

// Creates A New Expense
router.post("/", (req, res) => {
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

// Updates An Expense
router.patch("/", (req, res) => {
  let {
    UserID,
    ExpenseID,
    OldName,
    OldAmount,
    OldCategory,
    OldNote,
    NewName,
    NewAmount,
    NewCategory,
    NewNote,
  } = req.body;

  NewName === "" ? (NewName = OldName) : (NewName = NewName);
  NewAmount === "" ? (NewAmount = OldAmount) : (NewAmount = NewAmount);
  let isAmountChanged = true;
  let amountDifference;
  if (NewAmount === "") {
    NewAmount = OldAmount;
    isAmountChanged = false;
  } else {
    amountDifference = OldAmount - NewAmount;
  }
  NewCategory === ""
    ? (NewCategory = OldCategory)
    : (NewCategory = NewCategory);
  NewNote === "" ? (NewNote = OldNote) : (NewNote = NewNote);
  const filter = { _id: UserID, "Expenses._id": ExpenseID }; // Where ExpenseID is the ID of the Object Inside the Array
  const query = {
    $set: {
      "Expenses.$.Name": NewName,
      "Expenses.$.Amount": NewAmount,
      "Expenses.$.Category": NewCategory,
      "Expenses.$.Note": NewNote,
    },
  };
  const options = {
    returnOriginal: false,
  };
  User.findOneAndUpdate(filter, query, options)
    .then((suc) => {
      let newBalance;
      isAmountChanged
        ? (newBalance = suc.Balance + amountDifference)
        : (newBalance = suc.Balance);
      User.findByIdAndUpdate(suc._id, { Balance: newBalance }, options).then(
        (suc) => {
          res.send(suc);
        }
      );
    })
    .catch((err) => res.send("Error While Updating"));
});

// Deletes An Expense
router.delete("/", (req, res) => {
  const { UserID, ExpenseID } = req.query;
  const query = {
    $pull: {
      Expenses: { _id: ExpenseID },
    },
  };
  User.findByIdAndUpdate(UserID, query)
    .then((suc) => {
      let Amount = 0;
      suc.Expenses.forEach((item) => {
        if (item._id === ExpenseID) {
          Amount = item.Amount;
        }
      });
      res.send(`${Amount}`);
    })
    .catch((err) => {
      res.send("Reached Error Block");
    });
});
module.exports = router;
