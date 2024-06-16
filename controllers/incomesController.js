const IncomeSchema = require("../models/Income");

exports.addIncome = async (req, res) => {
  const { userId, accountId } = req.params
  const { name, amount, payer, date, category, notes } = req.body;

  try {
    //validations
    if ( !userId || !accountId || !name || !amount || !date || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    const income = IncomeSchema({
      userId,
      account: accountId,
      name,
      amount,
      payer,
      date,
      category,
      notes
    });
  
    await income.save();
    res.status(200).json({ message: "Income Added" });
    console.log(income);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchIncomes = async (req, res) => {
  const { userId, incomeId } = req.params;
  const { accountId, name, amount, payer, date, category, notes } = req.body;

  try {
        const income = await IncomeSchema.findOne({ _id: incomeId });
        if (!income) {
            return res.status(404).json({ message: "Income not found!" });
        }
        if (amount <= 0 || !amount === "number") {
          return res.status(400).json({ message: "Amount must be a positive number!" });
        }
        
        if (accountId) income.account = accountId;
        if (name) income.name = name;
        if (amount) income.amount = amount;
        if (payer) income.payer = payer;
        if (date) income.date = date;
        if (category) income.category = category;
        if (notes) income.notes = notes;

        await income.save();

        res.status(200).json({ message: "Income updated successfully", income });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteIncome = async (req, res) => {
  const { incomeId } = req.params;
  IncomeSchema.findByIdAndDelete(incomeId)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};