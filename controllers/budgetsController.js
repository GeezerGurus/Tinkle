const BudgetSchema = require("../models/Budget");

exports.addBudget = async (req, res) => {
  const { userId } = req.params
  const { period, currency, amount, endDate, startDate, category, description } = req.body;

  try {
    //validations
    if (!endDate || !startDate || !amount || !period || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    const budget = BudgetSchema({
      userId,
      period,
      amount,
      currency,
      endDate,
      startDate,
      category,
      description
    });
  
    await budget.save();
    res.status(200).json({ message: "Budget Added" });
    console.log(budget)
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getBudget = async (req, res) => {
  try {
    const budget = await BudgetSchema.find().sort({ createdAt: -1 });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchBudget = async (req, res) => {
  const { budgetId } = req.params;
  const { period, currency, amount, endDate, startDate, category, description } = req.body;
  try {
        const budget = await BudgetSchema.findOne({ _id: budgetId });
        if (!budget) {
            return res.status(404).json({ message: "Budget not found!" });
        }
        if (amount <= 0 || !amount === "number") {
          return res.status(400).json({ message: "Amount must be a positive number!" });
        }

        if (period) budget.period = period;
        if (currency) budget.name = currency;
        if (amount) budget.amount = amount;
        if (endDate) budget.endDate = endDate;
        if (startDate) budget.startDate = startDate;
        if (category) budget.category = category;
        if (description) budget.description = description;

        await budget.save();

        res.status(200).json({ message: "Budget updated successfully", budget });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

exports.deleteBudget = async (req, res) => {
  const { id } = req.params;
  BudgetSchema.findByIdAndDelete(id)
    .then((budget) => {
      res.status(200).json({ message: "Budget Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};