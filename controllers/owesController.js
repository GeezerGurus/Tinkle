const OweSchema = require("../models/Owe");
const DebtSchema = require("../models/Debt");

exports.addOwe = async (req, res) => {
  const userId = req.userId;
  const { debtId, amount } = req.body;

  try {
    if ( !debtId || !amount ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    const owe = OweSchema({
      userId,
      amount,
      debtId
    });

    if ( debt.amount < amount) {
        return res.status(400).json({ message: "The amount of owe money exceeds the debt record!" });
      }
      if ( debt.amount === 0 ) {
        return res.status(400).json({ message: "The debt is already paid!" });
      }
    const debt = await DebtSchema.findById({_id: debtId});
    debt.amount = debt.amount - amount;
    await debt.save();
    await owe.save();
    res.status(200).json({ message: "owe Added" });
    console.log(owe);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getOwes = async (req, res) => {
  try {
    const { debtId } = req.body;
    const owes = await OweSchema.find({ userId: req.userId, debtId: debtId }).sort({ createdAt: -1 });
    res.status(200).json(owes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchOwe = async (req, res) => {
  const { oweId } = req.params;
  const { debtId, amount } = req.body;
  try {
        const owe = await OweSchema.findOne({ userId: req.userId, debtId: debtId, _id: oweId });
        if (!owe) {
            return res.status(404).json({ message: "owe not found!" });
        }
        if (isNaN(amount) || amount <= 0) {
          return res.status(400).json({ message: "Amount must be a positive number!" });
        }

        const debt = await DebtSchema.findOne({ userId: req.userId, _id: debtId });
        debt.amount = debt.amount + owe.amount;
        owe.amount = amount;
        debt.amount = debt.amount - owe.amount;
        await debt.save();
        await owe.save();
        res.status(200).json({ message: "owe record updated successfully", debt });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteOwe = async (req, res) => {
  const { oweId } = req.params;
  const { debtId } = req.body;
  const owe = await OweSchema.findOne({ userId: req.userId, debtId: debtId, _id: oweId })
  if (!owe) {
    return res.status(404).json({ message: "owe record not found!" });
  }
  const debt = await DebtSchema.findOne({ userId: req.userId, _id: debtId });
  debt.amount = debt.amount + owe.amount;
  await debt.save();
  await OweSchema.findOneAndDelete({ userId: req.userId, _id: oweId})
    .then(() => {
      res.status(200).json({ message: "A owe record is deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};