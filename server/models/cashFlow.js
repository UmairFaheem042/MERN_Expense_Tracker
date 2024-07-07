const mongoose = require("mongoose");

const cashFlow = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  expenditure: {
    type: Number,
    required: true,
    default: 0,
  },
  income: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("CashFlow", cashFlow);
