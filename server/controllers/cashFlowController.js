const CashFlow = require("../models/cashFlow");

const getCashFlow = async (req, res) => {
  try {
    const cashFlow = await CashFlow.findOne();
    res.json(cashFlow);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getCashFlow };
