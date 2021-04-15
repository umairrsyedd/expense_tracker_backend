const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const port = 6500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Expense = require("./Routes/Expense.js");
const Income = require("./Routes/Income.js");
const Balance = require("./Routes/Balance.js");
const DatabaseID = process.env.DATABASE_ID;

mongoose
  .connect(DatabaseID, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

app.use(morgan("short"));
app.get("/", (req, res) => {
  res.send("Server Index Page");
  console.log(process.env.SAMPLE);
});

app.use("/Expense", Expense);
app.use("/Income", Income);
app.use("/Balance", Balance);

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});
