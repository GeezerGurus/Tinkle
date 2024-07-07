const GoalSchema = require("../models/Goal");

exports.addGoal = async (req, res) => {
  const userId = req.userId;
  const { name, amount, saveamount, description, desireDate } = req.body;

  try {
    if (!name || !amount) {
      return res.status(400).json({ message: "Name and Amount fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }
    
    const goal = GoalSchema({
      userId,
      name,
      amount,
      saveamount,
      description,
      desireDate
    });

    await goal.save();
    res.status(200).json({ message: "Goal Added" });
    console.log(goal);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goal = await GoalSchema.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaGoal = async (req, res) => {
  const { goalId } = req.params;
  try {
    const goal = await GoalSchema.findOne({ userId: req.userId, _id: goalId});
    if (!goal) {
      return res.status(404).json({ message: "Goal not found!" });
    }
    res.status(200).json(goal)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.patchGoal = async (req, res) => {
  const { goalId } = req.params;
  const { name, amount, saveamount, description, desireDate } = req.body;
  try {
        const goal = await GoalSchema.findOne({ userId: req.userId, _id: goalId });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found!" });
        }

        if (name) goal.name = name;
        if (amount) goal.amount = amount;
        if (saveamount) goal.saveamount = saveamount;
        if (description) goal.description = description;
        if (desireDate) goal.desireDate = desireDate;

        await goal.save();

        res.status(200).json({ message: "Goal updated successfully", goal });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteGoal = async (req, res) => {
  const { goalId } = req.params;
  GoalSchema.findOneAndDelete({ userId: req.userId, _id:goalId })
    .then((goal) => {
      res.status(200).json({ message: "Goal Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};