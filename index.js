const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const port = 6500;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Users = require("./Routes/User.js");
const Expense = require("./Routes/Expense.js");
const Income = require("./Routes/Income.js");
const Balance = require("./Routes/Balance.js");
const Transactions = require("./Routes/Transactions.js");
const ExpenseCategory = require("./Routes/ExpenseCategory.js");
const IncomeCategory = require("./Routes/IncomeCategory.js");
const DatabaseID = process.env.DATABASE_ID;
app.use(morgan("short"));

mongoose
  .connect(DatabaseID, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Index Page");
});
app.use("/User", Users);
app.use("/Expense", cors(), Expense); // Cross Origin Resource Sharing when Fetching From Font End react
app.use("/Income", Income);
app.use("/Balance", Balance);
app.use("/Transactions", Transactions);
app.use("/Category/Expense", ExpenseCategory);
app.use("/Category/Income", IncomeCategory);
app.use("*", (req, res) => {
  res.send("Page Does Not Exist");
});
app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});
