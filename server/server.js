const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const expenseRoutes = require("./routes/expense");
const cashFlowRoutes = require("./routes/cashFlow");

const app = express();
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/expense", expenseRoutes);
app.use("/cashflow", cashFlowRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
