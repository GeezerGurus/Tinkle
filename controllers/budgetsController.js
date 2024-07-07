const BudgetSchema = require("../models/Budget");

exports.addBudget = async (req, res) => {
  const userId = req.userId;
  const { name, period, amount, endDate, startDate, description } = req.body;

  try {
    if ( !name || !amount || !period) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    const budget = BudgetSchema({
      userId,
      name,
      period,
      amount,
      endDate,
      startDate,
      description
    });
  
    await budget.save();
    res.status(200).json({ message: "Budget Added" });
    console.log(budget)
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budget = await BudgetSchema.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaBudget = async (req, res) => {
  const { budgetId } = req.params;
  try {
    const budget = await BudgetSchema.findOne({ userId: req.userId, _id: budgetId});
    if (!budget) {
      return res.status(404).json({ message: "Budget not found!" });
    }
    res.status(200).json(budget)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.getBudgetPeriodically = async (req, res) => {
  const { period } = req.params;
  try {
    const budget = await BudgetSchema.find({ userId: req.userId, period: period});
    if (!budget) {
      return res.status(404).json({ message: "Budget not found!" });
    }
    res.status(200).json(budget)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.patchBudget = async (req, res) => {
  const { budgetId } = req.params;
  const { name, period, amount, endDate, startDate, description } = req.body;
  try {
        const budget = await BudgetSchema.findOne({ userId: req.userId ,_id: budgetId });
        if (!budget) {
            return res.status(404).json({ message: "Budget not found!" });
        }
        if (isNaN(amount) || amount <= 0) {
          return res.status(400).json({ message: "Amount must be a positive number!" });
        }

        if (period) budget.period = period;
        if (amount) budget.amount = amount;
        if (name) budget.name = name;
        if (endDate) budget.endDate = endDate;
        if (startDate) budget.startDate = startDate;
        if (description) budget.description = description;
        
        await budget.save();

        res.status(200).json({ message: "Budget updated successfully", budget });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

exports.deleteBudget = async (req, res) => {
  const { budgetId } = req.params;
  BudgetSchema.findOneAndDelete({userId: req.userId, _id: budgetId})
    .then((budget) => {
      res.status(200).json({ message: "Budget Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};