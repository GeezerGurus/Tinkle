const { requireAuth } = require("../middlewares/authentication"); //Apply this middleware to routes that should only be accessible to authenticated users. For example look at incomes route
// const {
//   addUser,
//   getUser,
//   patchUser,
//   deleteUser,
// } = require("../controllers/usersController");
const {
  addAccount,
  getAccounts,
  getaAccount,
  deleteAccount,
  patchAccount,
} = require("../controllers/accountsController");
const{
  addToBuyList,
  getToBuyLists,
  getaToBuyList,
  patchToBuyList,
  deleteToBuyList,
} = require("../controllers/tobuylistsController");
const{
  addItemToBuy,
  getItemsToBuy,
  getaItemToBuy,
  patchItemToBuy,
  deleteItemToBuy
} = require("../controllers/itemsToBuyController");
const {
  addDebt,
  getDebts,
  getaDebt,
  patchDebt,
  deleteDebt,
} = require("../controllers/debtsController");
const {
  addBudget,
  getBudgets,
  getaBudget,
  patchBudget,
  deleteBudget,
} = require("../controllers/budgetsController");
const {
  addBook,
  getBooks,
  getaBook,
  getFavouriteBooks,
  patchBook,
  deleteBook
} = require("../controllers/booksController");
const {
  signup_post,
  login_post,
  getUser,
  logout,
} = require("../controllers/authsController");
const {
  addVideo,
  getVideos,
  getFavouriteVideos,
  patchVideo,
  deleteVideo
} = require("../controllers/videosController");
const {
  addRecord,
  getRecords,
  getaRecord,
  patchRecord,
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
  getSettings,
  getaSetting,
  patchSetting,
  deleteSetting
} = require("../controllers/settingsController");
const {
  addLend,
  getLends,
  getaLend,
  patchLend,
  deleteLend
} = require("../controllers/lendsController");
const {
  addOwe,
  getOwes,
  getaOwe,
  patchOwe,
  deleteOwe
} = require("../controllers/owesController");

const router = require("express").Router();

router
  //Users sign up and login
  .post("/signup", signup_post)
  .post("/login", login_post)
  .get("/getuser", requireAuth, getUser)
  .get("/logout", requireAuth, logout)

  // //User
  // .post("/users", addUser)
  // .get("/users", getUser)
  // .patch("/users/:userId", patchUser)
  // .delete("/users/:id", deleteUser)

  //Accounts
  .post("/account", requireAuth, addAccount)
  .get("/account", requireAuth, getAccounts)
  .get("/account/:accountId", requireAuth, getaAccount)
  .patch("/account/:accountId", requireAuth, patchAccount)
  .delete("/account/:accountId", requireAuth, deleteAccount)

  //Debts
  .post("/debt", requireAuth, addDebt)
  .get("/debt", requireAuth, getDebts)
  .get("/debt/:debtId", requireAuth, getaDebt)
  .patch("/debt/:debtId", requireAuth, patchDebt)
  .delete("/debt/:debtId", requireAuth, deleteDebt)

  //Budgets
  .post("/budget", requireAuth, addBudget)
  .get("/budget", requireAuth, getBudgets)
  .get("/budget/:budgetId", requireAuth, getaBudget)
  .patch("/budget/:budgetId", requireAuth, patchBudget)
  .delete("/budget/:budgetId", requireAuth, deleteBudget)

  //To Buy Lists
  .post("/tobuylists", requireAuth, addToBuyList)
  .get("/tobuylists", requireAuth, getToBuyLists)
  .get("/tobuylists/:tobuylistId", requireAuth, getaToBuyList)
  .patch("/tobuylists/:tobuylistId", requireAuth, patchToBuyList)
  .delete("/tobuylists/:tobuylistId", requireAuth, deleteToBuyList)

  //Items to Buy
  .post("/itemstobuy", requireAuth, addItemToBuy)
  .get("/itemstobuy", requireAuth, getItemsToBuy)
  .get("/itemstobuy/:itemtobuyId", requireAuth, getaItemToBuy)
  .patch("/itemstobuy/:itemtobuyId", requireAuth, patchItemToBuy)
  .delete("/itemstobuy/:itemtobuyId", requireAuth, deleteItemToBuy)

  //Book
  .post("/book", requireAuth,addBook)
  .get("/book", requireAuth, getBooks)
  .get("/book/:bookid", requireAuth, getaBook)
  .get("/book/favourite", requireAuth, getFavouriteBooks)
  .put("/book/:bookid", requireAuth, patchBook)
  .delete("/book/:bookid", requireAuth, deleteBook)

  //Video
  .post("/video", requireAuth, addVideo)
  .get("/videos", requireAuth, getVideos)
  .get("/video", requireAuth, getFavouriteVideos)
  .put("/video/:id", requireAuth, patchVideo)
  .delete("/video/:id", requireAuth, deleteVideo)

  //Record
  .post("/record", requireAuth, addRecord)
  .get("/record", requireAuth, getRecords)
  .get("/record/:recordId", requireAuth, getaRecord)
  .patch("/record/:recordId", requireAuth, patchRecord)
  .delete("/record/:recordId", requireAuth, deleteRecord)

  //Categories
  .post("/categories", requireAuth, addCategory)
  .get("/categories", requireAuth, getCategory)
  .patch("/categories/:categoryId", requireAuth, patchCategory)
  .delete("/categories/:categoryId", requireAuth, deleteCategory)

  //Setting
  .post("/setting", requireAuth, addSetting)
  .get("/setting", requireAuth, getSettings)
  .get("/setting/:settingId", requireAuth, getSettings)
  .patch("/setting/:settingId", requireAuth, patchSetting)
  .delete("/setting/:settingId", requireAuth, deleteSetting)

  //Lends
  .post("/lend", requireAuth, addLend)
  .get("/lend", requireAuth, getLends)
  .get("/lend/:lendId", requireAuth, getaLend)
  .patch("/lend/:lendId", requireAuth, patchLend)
  .delete("/lend/:lendId", requireAuth, deleteLend)

  //Owes
  .post("/owe", requireAuth, addOwe)
  .get("/owe", requireAuth, getOwes)
  .get("/owe/:oweId", requireAuth, getaOwe)
  .patch("/owe/:oweId", requireAuth, patchOwe)
  .delete("/owe/:oweId", requireAuth, deleteOwe)

module.exports = router;
