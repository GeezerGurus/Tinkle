const { requireAuth } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");

const {
  addUser,
  getUsers,
  patchUser,
  deleteUser,
} = require("../controllers/usersController");
const {
  addAccount,
  getAccounts,
  getaAccount,
  deleteAccount,
  patchAccount,
} = require("../controllers/accountsController");
const {
  addToBuyList,
  getToBuyLists,
  getaToBuyList,
  patchToBuyList,
  deleteToBuyList,
} = require("../controllers/tobuylistsController");
const {
  addItemToBuy,
  getItemsToBuy,
  getaItemToBuy,
  patchItemToBuy,
  deleteItemToBuy,
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
  getBudgetPeriodically,
  patchBudget,
  deleteBudget,
} = require("../controllers/budgetsController");
const {
  addBook,
  getBooks,
  getaBook,
  getFavouriteBooks,
  addFavouriteBook,
  deleteFavouriteBook,
  deleteBook,
} = require("../controllers/booksController");
const {
  signup_post,
  login_post,
  getUser,
  addProfilePic,
  updateEmail,
  updatePassword,
  updateProfile,
  logout,
} = require("../controllers/authsController");
const {
  addVideo,
  getVideos,
  getaVideo,
  getFavouriteVideos,
  addFavouriteVideo,
  deleteFavouriteVideo,
  deleteVideo,
} = require("../controllers/videosController");
const {
  addRecord,
  getRecords,
  getaRecord,
  patchRecord,
  deleteRecord,
} = require("../controllers/recordController");
const {
  addCategory,
  getCategory,
  getaCategory,
  patchCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const {
  addSetting,
  getSettings,
  getaSetting,
  patchSetting,
  deleteSetting,
} = require("../controllers/settingsController");
const {
  addLend,
  getLends,
  getaLend,
  patchLend,
  deleteLend,
} = require("../controllers/lendsController");
const {
  addOwe,
  getOwes,
  getaOwe,
  patchOwe,
  deleteOwe,
} = require("../controllers/owesController");
const {
  addGoal,
  getGoals,
  getaGoal,
  patchGoal,
  deleteGoal,
} = require("../controllers/goalsController");

const router = require("express").Router();

router
  //Users sign up and login
  .post("/signup", signup_post)
  .post("/login", login_post)
  .get("/getuser", requireAuth, getUser)
  .post("/logout", requireAuth, logout)
  .post("/user/profile/photo", requireAuth, upload.single('profilePhoto'), addProfilePic)
  .patch("/user/newemail", requireAuth, updateEmail)
  .patch("/user/profile", requireAuth, updateProfile)
  .patch("/user/newpassword", requireAuth, updatePassword)
  
 //User
  .post("/users", addUser)
  .get("/users", getUsers)
  .patch("/users/:userId", patchUser)
  .delete("/user", requireAuth, deleteUser)

  //Accounts
  .post("/account", requireAuth, addAccount)
  .get("/accounts", requireAuth, getAccounts)
  .get("/account/:accountId", requireAuth, getaAccount)
  .patch("/account/:accountId", requireAuth, patchAccount)
  .delete("/account/:accountId", requireAuth, deleteAccount)

  //Debts
  .post("/debt", requireAuth, addDebt)
  .get("/debts", requireAuth, getDebts)
  .get("/debt/:debtId", requireAuth, getaDebt)
  .patch("/debt/:debtId", requireAuth, patchDebt)
  .delete("/debt/:debtId", requireAuth, deleteDebt)

  //Budgets
  .post("/budget", requireAuth, addBudget)
  .get("/budgets", requireAuth, getBudgets)
  .get("/budget/:budgetId", requireAuth, getaBudget)
  .get("/budgets/:period", requireAuth, getBudgetPeriodically)
  .patch("/budget/:budgetId", requireAuth, patchBudget)
  .delete("/budget/:budgetId", requireAuth, deleteBudget)

  //To Buy Lists
  .post("/tobuylist", requireAuth, addToBuyList)
  .get("/tobuylists", requireAuth, getToBuyLists)
  .get("/tobuylist/:tobuylistId", requireAuth, getaToBuyList)
  .patch("/tobuylist/:tobuylistId", requireAuth, patchToBuyList)
  .delete("/tobuylist/:tobuylistId", requireAuth, deleteToBuyList)

  //Items to Buy
  .post("/tobuylist/:tobuylistId/itemtobuy", requireAuth, addItemToBuy)
  .get("/tobuylist/:tobuylistId/itemstobuy", requireAuth, getItemsToBuy)
  .get(
    "/tobuylist/:tobuylistId/itemtobuy/:itemtobuyId",
    requireAuth,
    getaItemToBuy
  )
  .patch(
    "/tobuylist/:tobuylistId/itemtobuy/:itemtobuyId",
    requireAuth,
    patchItemToBuy
  )
  .delete(
    "/tobuylist/:tobuylistId/itemtobuy/:itemtobuyId",
    requireAuth,
    deleteItemToBuy
  )

  //Book
  .post("/book", addBook)
  .get("/books", getBooks)
  .get("/book/:bookId", getaBook)
  .get("/books/favourite", requireAuth, getFavouriteBooks)
  .post("/book/:bookId", requireAuth, addFavouriteBook)
  .delete("/book/:bookId", requireAuth, deleteFavouriteBook)
  .delete("/book/:bookId", deleteBook)

  //Video
  .post("/video", addVideo)
  .get("/videos", getVideos)
  .get("/video/:videoId", getaVideo)
  .get("/videos/favourite", requireAuth, getFavouriteVideos)
  .post("/video/:videoId", requireAuth, addFavouriteVideo)
  .delete("/video/:videoId", requireAuth, deleteFavouriteVideo)
  .delete("/video/:videoId", deleteVideo)

  //Record
  .post("/record", requireAuth, addRecord)
  .get("/records", requireAuth, getRecords)
  .get("/record/:recordId", requireAuth, getaRecord)
  .patch("/record/:recordId", requireAuth, patchRecord)
  .delete("/record/:recordId", requireAuth, deleteRecord)

  //Categories
  .post("/category", requireAuth, addCategory)
  .get("/categories", requireAuth, getCategory)
  .get("/category/:categoryId", requireAuth, getaCategory)
  .patch("/category/:categoryId", requireAuth, patchCategory)
  .delete("/category/:categoryId", requireAuth, deleteCategory)

  //Setting
  .post("/setting", requireAuth, addSetting)
  .get("/settings", requireAuth, getSettings)
  .get("/setting/:settingId", requireAuth, getaSetting)
  .patch("/setting/:settingId", requireAuth, patchSetting)
  .delete("/setting/:settingId", requireAuth, deleteSetting)

  //Lends
  .post("/debt/:debtId/lend", requireAuth, addLend)
  .get("/debt/:debtId/lends", requireAuth, getLends)
  .get("/debt/:debtId/lend/:lendId", requireAuth, getaLend)
  .patch("/debt/:debtId/lend/:lendId", requireAuth, patchLend)
  .delete("/debt/:debtId/lend/:lendId", requireAuth, deleteLend)

  //Owes
  .post("/debt/:debtId/owe", requireAuth, addOwe)
  .get("/debt/:debtId/owes", requireAuth, getOwes)
  .get("/debt/:debtId/owe/:oweId", requireAuth, getaOwe)
  .patch("/debt/:debtId/owe/:oweId", requireAuth, patchOwe)
  .delete("/debt/:debtId/owe/:oweId", requireAuth, deleteOwe)

  //Goals
  .post("/goal", requireAuth, addGoal)
  .get("/goals", requireAuth, getGoals)
  .get("/goal/:goalId", requireAuth, getaGoal)
  .patch("/goal/:goalId", requireAuth, patchGoal)
  .delete("/goal/:goalId", requireAuth, deleteGoal);

module.exports = router;
