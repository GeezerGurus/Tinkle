const ExpenseSchema = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const { userId, accountId } = req.params
  const { name, amount, payee, date, category, notes } = req.body;

  try {
    //validations
    if ( !userId || !accountId || !name || !amount || !date || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }
    
    const expense = ExpenseSchema({
      userId,
      account: accountId,
      name,
      amount,
      payee,
      date,
      category,
      notes
    });

    await expense.save();
    res.status(200).json({ message: "Expense Added" });
    console.log(expense);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.putExpense = async (req, res) => {
  const { userId, expenseId } = req.params;
  const { accountId, name, amount, payee, date, category, notes } = req.body;

  try {
        const expense = await ExpenseSchema.findOne({ _id: expenseId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found!" });
        }

        if (amount <= 0 || !amount === "number") {
          return res.status(400).json({ message: "Amount must be a positive number!" });
        }

        if (accountId) expense.account = accountId;
        if (name) expense.name = name;
        if (amount) expense.amount = amount;
        if (payee) expense.payee = payee;
        if (date) expense.date = date;
        if (category) expense.category = category;
        if (notes) expense.notes = notes;

        await expense.save();

        res.status(200).json({ message: "Expense updated successfully", expense });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};