const LendSchema = require("../models/Lend");
const DebtSchema = require("../models/Debt");

exports.addLend = async (req, res) => {
  const userId = req.userId;
  const { debtId, amount } = req.body;

  try {
    if ( !debtId || !amount ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    const lend = LendSchema({
      userId,
      amount,
      debtId
    });

    const debt = await DebtSchema.findById({_id: debtId});
    if ( debt.amount < amount) {
      return res.status(400).json({ message: "The amount of lend money exceeds the debt record!" });
    }
    if ( debt.amount === 0 ) {
      return res.status(400).json({ message: "The debt is already paid!" });
    }
    debt.amount = debt.amount - amount;
    await debt.save();
    await lend.save();
    res.status(200).json({ message: "Lend Added" });
    console.log(lend);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getLends = async (req, res) => {
  try {
    const { debtId } = req.body;
    const lends = await LendSchema.find({ userId: req.userId, debtId: debtId }).sort({ createdAt: -1 });
    res.status(200).json(lends);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaLend = async (req, res) => {
  const { lendId } = req.params;
  try {
    const lend = await LendSchema.findById({ userId: req.userId, _id: lendId});
    if (!lend) {
      return res.status(404).json({ message: "Lend not found!" });
    }
    res.status(200).json(lend)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.patchLend = async (req, res) => {
  const { lendId } = req.params;
  const { debtId, amount } = req.body;
  try {
        const lend = await LendSchema.findOne({ userId: req.userId, debtId: debtId, _id: lendId });
        if (!lend) {
            return res.status(404).json({ message: "Lend not found!" });
        }
        if (isNaN(amount) || amount <= 0) {
          return res.status(400).json({ message: "Amount must be a positive number!" });
        }

        const debt = await DebtSchema.findOne({ userId: req.userId, _id: debtId });
        debt.amount = debt.amount + lend.amount;
        lend.amount = amount;
        debt.amount = debt.amount - lend.amount;
        await debt.save();
        await lend.save();
        res.status(200).json({ message: "Lend record updated successfully", debt });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteLend = async (req, res) => {
  const { lendId } = req.params;
  const { debtId } = req.body;
  const lend = await LendSchema.findOne({ userId: req.userId, debtId: debtId, _id: lendId })
  if (!lend) {
    return res.status(404).json({ message: "Lend record not found!" });
  }
  const debt = await DebtSchema.findOne({ userId: req.userId, _id: debtId });
  debt.amount = debt.amount + lend.amount;
  await debt.save();
  await LendSchema.findOneAndDelete({ userId: req.userId, _id: lendId})
    .then(() => {
      res.status(200).json({ message: "A lend record is deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};