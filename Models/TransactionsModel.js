const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  TransactionLog: [
    {
      TransactionType: String,
      TransactionName: String,
      Date: Date,
      CurrentBalance: Number,
    },
  ],
});

module.exports = Transaction = mongoose.model("Transaction", TransactionSchema);
