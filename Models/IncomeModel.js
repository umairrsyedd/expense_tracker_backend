const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
  IncomesLog: [
    {
      Date: {
        type: Date,
        default: Date.now,
      },
      Category: String,
      Name: String,
      Amount: Number,
      Note: String,
    },
  ],
});

module.exports = Income = mongoose.model("Income", IncomeSchema);
