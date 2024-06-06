const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expensesController");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/incomesController");

const router = require("express").Router();

router
  .post("/incomes", addIncome)
  .get("/incomes", getIncomes)
  .delete("/incomes/:id", deleteIncome)
  .post("/expenses", addExpense)
  .get("/expenses", getExpense)
  .delete("/expenses/:id", deleteExpense);

module.exports = router;
