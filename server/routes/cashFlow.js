const express = require("express");
const router = express.Router();
const { getCashFlow } = require("../controllers/cashFlowController");

router.get("/", getCashFlow);

module.exports = router;
