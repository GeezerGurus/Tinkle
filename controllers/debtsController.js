const DebtSchema = require("../models/Debt");
const AccountSchema = require("../models/Account");

exports.addDebt = async (req, res) => {
  const userId = req.userId;
  const { type, accountId, name, purpose, amount, Date, DueDate } = req.body;

  try {
    if ( !type || !accountId || !name || !amount || !Date || !DueDate ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }
    const account = await AccountSchema.findById({ userId: req.userId, _id: accountId });
    if( !account ) {
      return res.status(400).json({ message: "Account not found!" });
    }

    const debt = DebtSchema({
      type,
      userId,
      accountId,
      name,
      purpose,
      amount,
      Date,
      DueDate
    });

    if ( debt.type === "lend" ) {
      account.balance = account.balance - amount;
      await account.save();
    }

    if ( debt.type === "owe" ) {
      account.balance = account.balance + amount;
      await account.save();
    }

    await debt.save();
    res.status(200).json({ message: "Debt Added" });
    console.log(debt);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error)
  }
};

exports.getDebts = async (req, res) => {
  try {
    const debt = await DebtSchema.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(debt);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaDebt = async (req, res) => {
  const { debtId } = req.params;
  try {
    const debt = await DebtSchema.findById({ userId: req.userId, _id: debtId});
    if (!debt) {
      return res.status(404).json({ message: "Debt not found!" });
    }
    res.status(200).json(debt)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.patchDebt = async (req, res) => {
  const { debtId } = req.params;
  const { type, accountId, name, purpose, amount, Date, DueDate } = req.body;
  try {
        const debt = await DebtSchema.findOne({ userId: req.userId, _id: debtId });
        if (!debt) {
            return res.status(404).json({ message: "Debt not found!" });
        }
        if (isNaN(amount) || amount <= 0) {
          return res.status(400).json({ message: "Number must be a positive number!" });
        }
        if (debt.type !== type) {
          return res.status(400).json({ message: "You cannot change the type of debt!" });
        }
        if (debt.accountId !== accountId) {
          return res.status(400).json({ message: "You cannot change the financial account!" });
        }
        if (name) debt.name = name;
        if (amount) {
          if (debt.type === "lend") {
            const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
            account.balance = account.balance + debt.amount;
            debt.amount = amount;
            account.balance = account.balance - debt.amount;
            await account.save();
          }
          if (debt.type === "owe") {
            const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
            account.balance = account.balance - debt.amount;
            debt.amount = amount;
            account.balance = account.balance + debt.amount;
            await account.save();
          }
        }
        if(purpose) debt.purpose = purpose;
        if (Date) debt.Date = Date;
        if (DueDate) debt.DueDate = DueDate;

        await debt.save();

        res.status(200).json({ message: "Debt record updated successfully", debt });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteDebt = async (req, res) => {
  const { debtId } = req.params;
  const debt = await DebtSchema.findOne({ useId: req.userId, _id: debtId });
  if (!debt) {
    return res.status(404).json({ message: "Debt not found!" });
  }
  // const account = await AccountSchema.findOne({ userId: req.userId, _id: debt.accountId });
  // if (debt.type == "lend") {
  //   account.balance = account.balance + debt.amount;
  //   await account.save();
  // }
  // if (debt.type == "owe") {
  //   account.balance = account.balance - debt.amount;
  //   await account.save();
  // }
  await DebtSchema.findOneAndDelete({ userId: req.userId, _id: debtId})
    .then(() => {
      res.status(200).json({ message: "Debt Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};