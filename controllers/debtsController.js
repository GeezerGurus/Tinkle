const DebtSchema = require("../models/Debt");

exports.addDebt = async (req, res) => {
  const userId = req.userId;
  const { type, accountId, name, purpose, amount, Date, DueDate } = req.body;

  try {
    if ( !type || !accountId || !name || !purpose || !amount || !Date || !DueDate ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
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

    await debt.save();
    res.status(200).json({ message: "Debt Added" });
    console.log(debt);
  } catch (error) {
    res.status(500).json({ message: error });
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
          return res.status(400).json({ message: "You cannot change the finance account!" });
        }
        if (name) debt.name = name;
        if (amount) debt.amount = amount;
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
  DebtSchema.findOneAndDelete({ userId: req.userId, _id: debtId})
    .then((debt) => {
      res.status(200).json({ message: "Debt Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};