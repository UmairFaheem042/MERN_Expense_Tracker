const Transaction = require("../models/expense");
const CashFlow = require("../models/cashFlow");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTransaction = async (req, res) => {
  const { title, amount, isDebit } = req.body;
  try {
    const parsedAmount = +amount; // Ensure amount is a number
    const parsedIsDebit = JSON.parse(isDebit);
    if (isNaN(parsedAmount)) {
      return res.status(400).json({ msg: "Invalid amount" });
    }
    const newTransaction = new Transaction({
      title,
      amount: parsedAmount,
      isDebit: parsedIsDebit,
    });
    const transaction = await newTransaction.save();

    let cashFlow = await CashFlow.findOne();
    if (!cashFlow) {
      cashFlow = new CashFlow();
    }

    console.log(typeof isDebit);
    console.log(typeof parsedIsDebit);
    if (parsedIsDebit) {
      console.log("if block");
      cashFlow.expenditure += parsedAmount;
      cashFlow.balance -= parsedAmount;
    } else {
      console.log("else block");
      cashFlow.income += parsedAmount;
      cashFlow.balance += parsedAmount;
    }
    await cashFlow.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteTransactions = async (req, res) => {
  try {
    await Transaction.deleteMany({});
    let cashFlow = await CashFlow.findOne();
    if (cashFlow) {
      cashFlow.balance = 0;
      cashFlow.expenditure = 0;
      cashFlow.income = 0;
      await cashFlow.save();
    }
    res
      .status(200)
      .json({ msg: "All transactions deleted and cash flow reset" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getAllTransactions, createTransaction, deleteTransactions };
