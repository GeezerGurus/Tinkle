const RecordSchema = require("../models/Record");

exports.addRecord = async (req, res) => {
  const userId = req.userId;
  const { accountId, categoryId } = req.params
  const { type, amount, category, date, payer, payee, notes } = req.body;

  try {
    if ( !amount || !date || !accountId || !categoryId || !type ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Number must be a positive number!" });
    }

    const record = RecordSchema({
        userId,
        accountId,
        categoryId,
        type,
        amount,
        category,
        date,
        payer,
        payee,
        notes
      });

    await record.save();
    res.status(200).json({ message: "Record Added" });
    console.log(record);
  } catch (error) {
    if (error.errors && error.errors.type) {
      return res.status(400).json({ error: error.errors.type.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

exports.getRecord = async (req, res) => {
  try {
    const record = await RecordSchema.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchRecord = async (req, res) => {
  const { recordId } = req.params;
  const { accountId, categoryId, type, amount, category, date, payer, payee, notes } = req.body;
  try {
        const record = await RecordSchema.findOne({ userId: req.userId ,_id: recordId});
        if (!record) {
            return res.status(404).json({ message: "Record not found!" });
        }

        if (accountId) record.accountId = accountId;
        if (categoryId) record.categoryId = categoryId;
        if (type) record.type = type;
        if (amount) record.amount = amount;
        if (category) record.category = category;
        if (date) record.date = date;
        if (payer) record.payer = payer;
        if (payee) record.payee = payee;
        if (notes) record.notes = notes;

        await record.save();

        res.status(200).json({ message: "Record updated successfully", debt });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteRecord = async (req, res) => {
  const { recordId } = req.params;
  RecordSchema.findOneAndDelete({ userId: req.userId, _id: recordId })
    .then((record) => {
      res.status(200).json({ message: "Record Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: error });
    });
};