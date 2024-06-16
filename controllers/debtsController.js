const DebtSchema = require("../models/Debt");

exports.addDebt = async (req, res) => {
  const { userId } = req.params
  const { name, amount, currency, category, payer, startDate, endDate, description } = req.body;

  try {
    //validations
    if ( !currency || !name || !amount || !startDate || !category || !endDate) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    const debt = DebtSchema({
      userId,
      name,
      amount,
      payer,
      currency,
      category,
      startDate,
      endDate,
      description
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
    const debt = await DebtSchema.find().sort({ createdAt: -1 });
    res.status(200).json(debt);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchDebts = async (req, res) => {
  const { userId, debtId } = req.params;
  const { name, amount, payer, category, description } = req.body;
  try {
        const debt = await DebtSchema.findOne({ _id: debtId });
        if (!debt) {
            return res.status(404).json({ message: "Debt not found!" });
        }
        if (amount <= 0 || !amount === "number") {
          return res.status(400).json({ message: "Amount must be a positive number!" });
        }

        if (name) debt.name = name;
        if (amount) debt.amount = amount;
        if(payer) debt.payer = payer;
        if (currency) debt.currency = currency;
        if (category) debt.category = category;
        if (startDate) debt.startDate = startDate;
        if (endDate) debt.endDate = endDate;
        if (description) debt.description = description;

        await debt.save();

        res.status(200).json({ message: "Debt updated successfully", debt });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteDebt = async (req, res) => {
  const { id } = req.params;
  DebtSchema.findByIdAndDelete(id)
    .then((debt) => {
      res.status(200).json({ message: "Debt Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};