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
const User = require("../Models/UserModel.js");

router.get("/", (req, res) => {
  const { ID } = req.query;
  User.findById(ID).then((value) => {
    res.send(value.Incomes);
  });
});
router.get("/recent", (req, res) => {
  const { ID } = req.query;
  User.findById(ID).then((value) => {
    Incomes = value.Incomes;
    RecentIncomes = Incomes.slice(Math.max(Incomes.length - 5));
    RecentIncomes.reverse();
    res.send(RecentIncomes);
  });
});

router.post("/Create", (req, res) => {
  const { IncomeCategory, Name, Amount, Note } = req.body;
  const { ID } = req.query;
  let NewIncome = { Name, Amount, IncomeCategory, Note };
  let NewTransaction = { TransactionType: "Income", TransactionName: Name };
  User.findByIdAndUpdate(ID, { $push: { Incomes: NewIncome } }).then(
    (success) => {
      NewBalance = Number(success.Balance) + Number(Amount);
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

router.delete("/", async (req, res) => {
  const { UserID, IncomeID } = req.query;
  const user = await User.findOne({ _id: UserID });
  let OldBalance = user.Balance;
  const IncomesArray = user.Incomes;
  IncomesArray.forEach((income) => {
    if (income._id == IncomeID) {
      OldBalance = OldBalance - income.Amount;
    }
  });
  const query = {
    $pull: {
      Incomes: { _id: IncomeID },
    },
    Balance: OldBalance,
  };
  await User.findByIdAndUpdate(UserID, query);
});
module.exports = router;
