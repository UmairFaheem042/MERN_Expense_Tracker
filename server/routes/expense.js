const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  createTransaction,
  deleteTransactions
} = require("../controllers/expenseController");

router.get("/", getAllTransactions);
router.post("/", createTransaction);
router.delete("/", deleteTransactions);

module.exports = router;
