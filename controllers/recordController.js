const RecordSchema = require("../models/Record");

exports.addRecord = async (req, res) => {
  const userId = req.userId;
  const { accountId, fromaccountId, toaccountId, budgetId, type, amount, category, date, transactor, notes } = req.body;

  try {
    if ( accountId && budgetId ) {
      return res.status(400).json({ message: "Choose either account or budget." })
    }
    if ( !amount || !date || !accountId || !type ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Number must be a positive number!" });
    }

    let record;
    if (type === "income" || type === "expense") {
      record = new RecordSchema({
        userId,
        accountId,
        type,
        amount,
        category,
        date,
        transactor,
        notes
      });
    }
    else if (type === "transfer") {
      if ( fromaccountId === toaccountId ) {
        return res.status(400).json({ message: "Two accounts cannot be the same account." })
      }
      record = new RecordSchema({
        userId,
        accountId,
        type,
        amount,
        category,
        date,
        transactor,
        notes
      });
    }
    else {
      res.status(400).json({ message: "Invalid type" });
    }
    await record.save();
    res.status(201).json({ message: "Record Added", record });
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
  const { accountId, fromaccountId, toaccountId, budgetId, type, amount, category, date, transactor, notes } = req.body;
  
  try {
    const record = await RecordSchema.findOne({ userId: req.userId, _id: recordId });
    if (!record) {
      return res.status(404).json({ message: "Record not found!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Number must be a positive number!" });
    }

    if ( record.type !== "transfer" ) {
      if (accountId) record.accountId = accountId;
      if (budgetId) record.budgetId = budgetId;
      if (type) record.type = type;
      if (amount) record.amount = amount;
      if (category) record.category = category;
      if (date) record.date = date;
      if (transactor) record.transactor = transactor;
      if (notes) record.notes = notes;
    }
    
    else {
      if (fromaccountId) record.fromaccountId = fromaccountId;
      if (toaccountId) record.toaccountId = toaccountId;
      if (amount) record.amount = amount;
      if (date) record.date = date;
      if (transactor) record.transactor = transactor;
      if (notes) record.notes = notes;
    }

    await record.save();

    res.status(200).json({ message: "Record updated successfully", record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  const { recordId } = req.params;
  
  try {
    const record = await RecordSchema.findOneAndDelete({ userId: req.userId, _id: recordId });
    if (!record) {
      return res.status(404).json({ message: "Record not found!" });
    }

    res.status(200).json({ message: "Record Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};