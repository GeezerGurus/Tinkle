const {
  addExpense,
  getExpense,
  deleteExpense,
  putExpense,
} = require("../controllers/expensesController");
const {
  addIncome,
  getIncomes,
  deleteIncome,
  patchIncomes,
} = require("../controllers/incomesController");
const {
  addUser,
  getUser,
  patchUser,
  deleteUser
} = require("../controllers/usersController");
const {
  addAccount,
  getAccount,
  deleteAccount,
  patchAccount,
} = require("../controllers/accountsController");
const {
  addDebt,
  getDebts,
  patchDebts,
  deleteDebt,
} = require("../controllers/debtsController");
const { 
  addBudget,
  getBudget,
  patchBudget,
  deleteBudget,
} = require("../controllers/budgetsController");
const{
  addItemsToBuy,
  getItemsToBuy,
  deleteItemsToBuy,
  patchItemsToBuy
} = require("../controllers/itemsToBuyController");
const{
  addTransfer,
  getTransfer,
  patchTransfer,
  deleteTransfer
} = require("../controllers/transfersController");

const router = require("express").Router();

router
  //Incomes
  .post("/users/:userId/account/:accountId/incomes", addIncome)
  .get("/incomes", getIncomes)
  .patch("/users/:userId/incomes/:incomeId", patchIncomes)
  .delete("/incomes/:incomeId", deleteIncome)

  //Expenses
  .post("/users/:userId/account/:accountId/expenses", addExpense)
  .get("/expenses", getExpense)
  .put("/users/:userId/expenses/:expenseId", putExpense)
  .delete("/expenses/:expenseId", deleteExpense)

  //User
  .post("/users", addUser)
  .get("/users", getUser)
  .patch("/users/:userId", patchUser)
  .delete("/users/:id", deleteUser)

  //Accounts
  .post("/users/:userId/account", addAccount)
  .get("/account", getAccount)
  .patch("/account/:accountId", patchAccount)
  .delete("/account/:accountId", deleteAccount)

  //Debts
  .post("/debt", addDebt)
  .get("/debt", getDebts)
  .patch("/users/:userId/debt/:debtId", patchDebts)
  .delete("/debt/:debtId", deleteDebt)

  //Budgets
  .post("/users/:userId/budget", addBudget)
  .get("/budget", getBudget)
  .patch("/users/:userId/budget/:budgetId", patchBudget)
  .delete("/budget/:budgetId", deleteBudget)

  //Items to Buy
  .post("/users/:userId/itemstobuy", addItemsToBuy)
  .get("/itemstobuy", getItemsToBuy)
  .patch("/users/:userId/itemstobuy/:itemtobuyId", patchItemsToBuy)
  .delete("/itemstobuy/:id", deleteItemsToBuy)
  
  //Transfer
  .post("/users/:userId/transfer", addTransfer)
  .get("/transfer", getTransfer)
  .patch("/users/:userId/transfer/:transferId", patchTransfer)
  .delete("/transfer/:id", deleteTransfer);

module.exports = router;