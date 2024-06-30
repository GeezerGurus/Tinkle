const { requireAuth } = require("../middlewares/authentication"); //Apply this middleware to routes that should only be accessible to authenticated users. For example look at incomes route
const {
  addUser,
  getUser,
  patchUser,
  deleteUser,
} = require("../controllers/usersController");
const {
  addAccount,
  getAccount,
  deleteAccount,
  patchAccount,
} = require("../controllers/accountsController");
const{
  addItemsToBuy,
  getItemsToBuy,
  deleteItemsToBuy,
  patchItemsToBuy
} = require("../controllers/itemsToBuyController");
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
const {
  addBook,
  getBook,
  patchBook,
  deleteBook
} = require("../controllers/booksController");
const {
  signup_post,
  login_post,
  logout,
} = require("../controllers/authsController");
const {
  addDocument,
  getDocument,
  patchDocument,
  deleteDocument
} = require("../controllers/documentController");
const {
  addVideo,
  getVideo,
  patchVideo,
  deleteVideo
} = require("../controllers/videosController");
const {
  addRecord,
  getRecord,
  putRecord,
  deleteRecord
} = require("../controllers/recordController");
const {
  addCategory,
  getCategory,
  patchCategory,
  deleteCategory
} = require("../controllers/categoryController");
const {
  addSetting,
  getSetting,
  patchSetting,
  deleteSetting
} = require("../controllers/settingsController");

const router = require("express").Router();

router
  //Users sign up and login
  .post("/signup", signup_post)
  .post("/login", login_post)
  .get("/logout", logout)

  //User
  .post("/users", addUser)
  .get("/users", getUser)
  .patch("/users/:userId", patchUser)
  .delete("/users/:id", deleteUser)

  //Accounts
  .post("/account", requireAuth, addAccount)
  .get("/account", requireAuth, getAccount)
  .patch("/account/:accountId", requireAuth, patchAccount)
  .delete("/account/:accountId", requireAuth, deleteAccount)

  //Debts
  .post("/debt", requireAuth, addDebt)
  .get("/debt", requireAuth, getDebts)
  .patch("/debt/:debtId", requireAuth, patchDebts)
  .delete("/debt/:debtId", requireAuth, deleteDebt)

  //Budgets
  .post("/budget", requireAuth, addBudget)
  .get("/budget", requireAuth, getBudget)
  .patch("/budget/:budgetId", requireAuth, patchBudget)
  .delete("/budget/:budgetId", requireAuth, deleteBudget)

  //Items to Buy
  .post("/itemstobuy", requireAuth, addItemsToBuy)
  .get("/itemstobuy", requireAuth, getItemsToBuy)
  .patch("/itemstobuy/:itemtobuyId", requireAuth, patchItemsToBuy)
  .delete("/itemstobuy/:itemtobuyId", requireAuth, deleteItemsToBuy)

  //Book
  .post("/book", requireAuth,addBook)
  .get("/book", requireAuth, getBook)
  .put("/book/:bookid", requireAuth, patchBook)
  .delete("/book/:bookid", requireAuth, deleteBook)

  //Document
  .post("/document", requireAuth, addDocument)
  .get("/document", requireAuth, getDocument)
  .put("/document/:documentId", requireAuth, patchDocument)
  .delete("/document/:documentId", requireAuth, deleteDocument)

  //Video
  .post("/video", requireAuth, addVideo)
  .get("/video", requireAuth, getVideo)
  .put("/video/:id", requireAuth, patchVideo)
  .delete("/video/:id", requireAuth, deleteVideo)

  //Record
  .post("/record", requireAuth, addRecord)
  .get("/record", requireAuth, getRecord)
  .put("/account/:accountId/categories/:categoryId/record/:recordId", requireAuth, putRecord)
  .delete("/account/:accountId/categories/:categoryId/record/:recordId", requireAuth, deleteRecord)

  //Categories
  .post("/categories", requireAuth, addCategory)
  .get("/categories", requireAuth, getCategory)
  .patch("/categories/:categoryId", requireAuth, patchCategory)
  .delete("/categories/:categoryId", requireAuth, deleteCategory)

  //Setting
  .post("/setting", requireAuth, addSetting)
  .get("/setting", requireAuth, getSetting)
  .patch("/setting/:settingId", requireAuth, patchSetting)
  .delete("/setting/:settingId", requireAuth, deleteSetting)

module.exports = router;
