const OweSchema = require("../models/Owe");
const DebtSchema = require("../models/Debt");

exports.addOwe = async (req, res) => {
  const userId = req.userId;
  const { debtId } = req.params
  const { amount, Date } = req.body;

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
      debtId, 
      Date 
    });

    const debt = await DebtSchema.findOne({_id: debtId});
    if ( debt.amount < amount) {
        return res.status(400).json({ message: "The amount of owe money exceeds the debt record!" });
      }
      if ( debt.amount === 0 ) {
        return res.status(400).json({ message: "The debt is already paid!" });
      }
    debt.amount -= amount;
    await debt.save();
    await owe.save();
    res.status(200).json({ message: "Owe Added" });
    console.log(owe);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getOwes = async (req, res) => {
  try {
    const { debtId } = req.params;
    const owes = await OweSchema.find({ userId: req.userId, debtId: debtId }).sort({ createdAt: -1 });
    res.status(200).json(owes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaOwe = async (req, res) => {
  const { debtId, oweId } = req.params;
  try {
    const owe = await OweSchema.findOne({ userId: req.userId, debtId: debtId, _id: oweId });
    if (!owe) {
      return res.status(404).json({ message: "Owe not found!" });
    }
    res.status(200).json(owe)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.patchOwe = async (req, res) => {
  const { debtId, oweId } = req.params;
  const { amount, Date  } = req.body;
  try {
        const owe = await OweSchema.findOne({ userId: req.userId, debtId: debtId, _id: oweId });
        if (!owe) {
            return res.status(404).json({ message: "Owe not found!" });
        }
        if (amount) {
          if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number!" });
          }
          const debt = await DebtSchema.findOne({ userId: req.userId, _id: owe.debtId });
          debt.amount += Number(owe.amount);
          owe.amount = amount;
          debt.amount -= owe.amount;
          await debt.save();
        }
        if (Date) owe.Date = Date
        
        await owe.save();
        res.status(200).json({ message: "Owe record updated successfully", owe });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteOwe = async (req, res) => {
  const { debtId, oweId } = req.params;
  const owe = await OweSchema.findOne({ userId: req.userId, debtId: debtId, _id: oweId })
  if (!owe) {
    return res.status(404).json({ message: "Owe record not found!" });
  }
  const debt = await DebtSchema.findOne({ userId: req.userId, _id: owe.debtId });
  debt.amount += Number(owe.amount);
  await debt.save();
  await OweSchema.findOneAndDelete({ userId: req.userId, debtId: debtId, _id: oweId })
    .then(() => {
      res.status(200).json({ message: "Owe record is deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};