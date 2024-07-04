const RecordSchema = require("../models/Record");
const AccountSchema = require("../models/Account");
const BudgetSchema = require("../models/Budget");

exports.addRecord = async (req, res) => {
  const userId = req.userId;
  const { accountId, fromaccountId, toaccountId, budgetId, type, amount, category, date, transactor, notes } = req.body;

  try {
    if ( (accountId && budgetId) || (!accountId && !budgetId) ) {
      return res.status(400).json({ message: "Choose either account or budget!" })
    }
    if ( !amount || !date || (!accountId && !budgetId) || !type ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Number must be a positive number!" });
    }

    let record;
    if (type === "income") {
      if (accountId) {
        const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
        if (!account) {
          return res.status(400).json({ message: "Account not found!" });
        }
        account.balance += amount;
        await account.save();
      }
      if (budgetId) {
        const budget = await BudgetSchema.findOne({ userId: req.userId,  _id: budgetId });
        if (!budget) {
          return res.status(400).json({ message: "Budget account not found!" });
        }
        budget.amount += amount;
        await budget.save();
      }
    }
    else if (type === "expense") {
      if (accountId) {
        const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
        if (!account) {
          return res.status(400).json({ message: "Account not found!" });
        }
        account.balance -=  amount;
        await account.save();
      }
      if (budgetId) {
        const budget = await BudgetSchema.findOne({ userId: req.userId,  _id: budgetId });
        if (!budget) {
          return res.status(400).json({ message: "Budget account not found!" });
        }
        budget.amount -= amount;
        await budget.save();
      }
    }
    else if (type === "transfer") {
      if ( fromaccountId === toaccountId ) {
        return res.status(400).json({ message: "Two accounts cannot share the same account." })
      }
      const fromaccount = await AccountSchema.findOne({ userId: req.userId, _id: fromaccountId });
      if (!fromaccount) {
        return res.status(400).json({ message: "Account not found!" });
      }
      const toaccount = await AccountSchema.findOne({ userId: req.userId, _id: toaccountId });
      if (!toaccount) {
        return res.status(400).json({ message: "Account not found!" });
      }
      fromaccount.balance -= amount;
      toaccount.balance += amount;
      await fromaccount.save();
      await toaccount.save();
    }
    else {
      return res.status(400).json({ message: "Invalid type" });
    }

    record = new RecordSchema({
      userId,
      accountId,
      fromaccountId,
      toaccountId,
      budgetId,
      type,
      amount,
      category,
      date,
      transactor,
      notes,
    });    

    await record.save();
    res.status(201).json({ message: "Record Added", record });
    console.log(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const record = await RecordSchema.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getaRecord = async (req, res) => {
  const { recordId } = req.params;
  try {
    const record = await RecordSchema.findOne({ userId: req.userId, _id: recordId});
    if (!record) {
      return res.status(404).json({ message: "Record not found!" });
    }
    res.status(200).json(record)
  } catch {
    res.status(500).json({ message: error.message });
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

    if ( type && record.type !== "transfer" ) {

      if ( record.type !== type && type === "expense" ) {
        if (!accountId) {
          const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
          if (!amount) {
            account.balance -= ( 2 * record.amount );
            await account.save();
          }
          else {
            account.balance -= record.amount;
            record.amount = amount;
            account.balance -= record.amount;
            await account.save();
          }
        }
        else {
          const newaccount = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
          if (!newaccount) {
            return res.status(404).json({ message: "Account not found!" });
          }
          if (!amount) {
            const account = await AccountSchema.findOne({ userId: req.userId, _id: record.accountId });
            account.balance -= record.amount;
            newaccount.balance -= record.amount;
            await account.save();
            await newaccount.save();
          }
          else {
            const account = await AccountSchema.findOne({ userId: req.userId, _id: record.accountId });
            account.balance -= record.amount;
            record.amount = amount;
            newaccount.balance -= record.amount;
            await account.save();
            await newaccount.save();
          }
          record.accountId = accountId;
        }
        if (!budgetId) {
          const budget = await BudgetSchema.findOne({ userId: req.userId, _id: budgetId });
          if (!amount) {
            budget.amount -= (2 * record.amount);
            await budget.save();
          }
          if (amount) {
            budget.amount -= record.amount;
            record.amount = amount;
            budget.amount -= record.amount;
            await budget.save();
          }
        }
        else {
          const newbudget = await BudgetSchema.findOne({ userId: req.userId, _id: budgetId });
          if (!newbudget) {
            return res.status(404).json({ message: "Budget not found!" });
          }
          if (!amount) {
            const budget = await BudgetSchema.findOne({ userId: req.userId, _id: record.budgetId });
            budget.amount -= record.amount;
            newbudget.amount -= record.amount;
            await budget.save();
            await newbudget.save();
          }
          else {
            const budget = await BudgetSchema.findOne({ userId: req.userId, _id: record.accountId });
            budget.amount -= record.amount;
            record.amount = amount;
            newbudget.amount -= record.amount;
            await budget.save();
            await newbudget.save();
          }
          record.budgetId = budgetId;
        }
        record.type = type;
      }
      
      if ( record.type !== type && type === "income" ) {
        if (!accountId) {
          const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
          if (!amount) {
            account.balance += (2 * record.amount);
            await account.save();
          }
          if (amount) {
            account.balance += record.amount;
            record.amount = amount;
            account.balance += record.amount;
            await account.save();
          }
        }
        else {
          const newaccount = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
          if (!newaccount) {
            return res.status(404).json({ message: "Account not found!" });
          }
          if (!amount) {
            const account = await AccountSchema.findOne({ userId: req.userId, _id: record.accountId });
            account.balance += record.amount;
            newaccount.balance += record.amount;
            await account.save();
            await newaccount.save();
          }
          else {
            const account = await AccountSchema.findOne({ userId: req.userId, _id: record.accountId });
            account.balance += record.amount;
            record.amount = amount;
            newaccount.balance += record.amount;
            await account.save();
            await newaccount.save();
          }
          record.accountId = accountId;
        }
        if (!budgetId) {
          const budget = await BudgetSchema.findOne({ userId: req.userId, _id: budgetId });
          if (!amount) {
            budget.amount += (2 * record.amount);
            await budget.save();
          }
          if (amount) {
            budget.amount += record.amount;
            record.amount = amount;
            budget.amount += record.amount;
            await budget.save();
          }
        }
        else {
          const newbudget = await BudgetSchema.findOne({ userId: req.userId, _id: budgetId });
          if (!newbudget) {
            return res.status(404).json({ message: "Budget not found!" });
          }
          if (!amount) {
            const budget = await BudgetSchema.findOne({ userId: req.userId, _id: record.budgetId });
            budget.amount += record.amount;
            newbudget.amount += record.amount;
            await budget.save();
            await newbudget.save();
          }
          else {
            const budget = await BudgetSchema.findOne({ userId: req.userId, _id: record.accountId });
            budget.amount += record.amount;
            record.amount = amount;
            newbudget.amount += record.amount;
            await budget.save();
            await newbudget.save();
          }
          record.budgetId = budgetId;
        }
        record.type = type;
      }

      if (accountId) {
        if ( record.type === "income" ){
          if (amount) {
            const account = await AccountSchema.findOne({ userId:req.userId, _id: record.accountId });
            const newaccount = await AccountSchema.findOne({ userId:req.userId, _id: accountId });
            account.balance -= record.amount;
            record.amount = amount;
            newaccount.balance += record.amount;
            await account.save();
            await newaccount.save();
          }
          else {
            const account = await AccountSchema.findOne({ userId:req.userId, _id: record.accountId });
            const newaccount = await AccountSchema.findOne({ userId:req.userId, _id: accountId });
            account.balance -= record.amount;
            newaccount.balance += record.amount;
            await account.save();
            await newaccount.save();
          }
        }
        else if ( record.type === "expense") {
          if (amount) {
            const account = await AccountSchema.findOne({ userId:req.userId, _id: record.accountId });
            const newaccount = await AccountSchema.findOne({ userId:req.userId, _id: accountId });
            account.balance += record.amount;
            record.amount = amount;
            newaccount.balance -= record.amount;
            await account.save();
            await newaccount.save();
          }
          else {
            const account = await AccountSchema.findOne({ userId:req.userId, _id: record.accountId });
            const newaccount = await AccountSchema.findOne({ userId:req.userId, _id: accountId });
            account.balance += record.amount;
            newaccount.balance -= record.amount;
            await account.save();
            await newaccount.save();
          }
        }
        record.accountId = accountId;
      }
      if (budgetId) {
        if ( record.type === "income" ){
          if (amount) {
            const budget = await BudgetSchema.findOne({ userId:req.userId, _id: record.budgetId });
            const newbudget = await BudgetSchema.findOne({ userId:req.userId, _id: budgetId });
            budget.amount -= record.amount;
            record.amount = amount;
            newbudget.amount += record.amount;
            await budget.save();
            await newbudget.save();
          }
          else {
            const budget = await BudgetSchema.findOne({ userId:req.userId, _id: record.budgetId });
            const newbudget = await BudgetSchema.findOne({ userId:req.userId, _id: budgetId });
            budget.amount -= record.amount;
            newbudget.amount += record.amount;
            await budget.save();
            await newbudget.save();
          }
        }
        else if ( record.type === "expense") {
          if (amount) {
            const budget = await BudgetSchema.findOne({ userId:req.userId, _id: record.budgetId });
            const newbudget = await BudgetSchema.findOne({ userId:req.userId, _id: budgetId });
            budget.amount += record.amount;
            record.amount = amount;
            newbudget.amount -= record.amount;
            await budget.save();
            await newbudget.save();
          }
          else {
            const budget = await BudgetSchema.findOne({ userId:req.userId, _id: record.budgetId });
            const newbudget = await BudgetSchema.findOne({ userId:req.userId, _id: budgetId });
            budget.amount -= record.amount;
            record.amount = amount;
            newbudget.amount += record.amount;
            await budget.save();
            await newbudget.save();
          }
        }
        record.budgetId = budgetId;
      }
      if (amount) {
        if (record.type === "income") {
          if (record.accountId) {
            const account = await AccountSchema.findOne({ userId: req.userId, _id: record.accountId });
            account.balance -= record.amount;
            record.amount = amount;
            account.balance += record.amount;
            await account.save();
          }
          else if (record.budgetId) {
            const budget = await BudgetSchema.findOne({ userId: req.userId, _id: record.budgetId });
            budget.amount -= record.amount;
            record.amount = amount;
            budget.amount += record.amount;
            await budget.save();
          }
        }
        else if (record.type === "expense") {
          if (record.accountId) {
            const account = await AccountSchema.findOne({ userId: req.userId, _id: record.accountId });
            account.balance += record.amount;
            record.amount = amount;
            account.balance -= record.amount;
            await account.save();
          }
          else if (record.budgetId) {
            const budget = await BudgetSchema.findOne({ userId: req.userId, _id: record.budgetId });
            budget.amount += record.amount;
            record.amount = amount;
            budget.amount -= record.amount;
            await budget.save();
          }
        }
      } 

      if (category) record.category = category;
      if (date) record.date = date;
      if (transactor) record.transactor = transactor;
      if (notes) record.notes = notes;
    }
    
    else if (type === "transfer") {
      if (fromaccountId && toaccountId) {
        if (amount) {
          const newfromaccount = await AccountSchema.findOne({ userId: req.userId, _id: fromaccountId });
          const fromaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.fromaccountId });
          const newtoaccount = await AccountSchema.findOne({ userId: req.userId, _id: toaccountId });
          const toaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.toaccountId });
          fromaccount.balance += record.amount;
          toaccount.balance -= record.amount;
          record.amount = amount;
          newfromaccount.balance -= record.amount;
          newtoaccount.balance += record.amount;
          await fromaccount.save();
          await toaccount.save();
          await newfromaccount.save();
          await newtoaccount.save();
        }
        else {
          const newfromaccount = await AccountSchema.findOne({ userId: req.userId, _id: fromaccountId });
          const fromaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.fromaccountId });
          const newtoaccount = await AccountSchema.findOne({ userId: req.userId, _id: toaccountId });
          const toaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.toaccountId });
          fromaccount.balance += record.amount;
          toaccount.balance -= record.amount;
          newfromaccount.balance -= record.amount;
          newtoaccount.balance += record.amount;
          await fromaccount.save();
          await toaccount.save();
          await newfromaccount.save();
          await newtoaccount.save();
        }
      }
      else if (fromaccountId && !toaccountId) {
        if (amount) {
          const newfromaccount = await AccountSchema.findOne({ userId: req.userId, _id: fromaccountId });
          const fromaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.fromaccountId });
          const toaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.toaccountId });
          fromaccount.balance += record.amount;
          toaccount.balance -= record.amount;
          record.amount = amount;
          newfromaccount.balance -= record.amount;
          toaccount.balance += record.amount;
          await fromaccount.save();
          await toaccount.save();
          await newfromaccount.save();
        }
        else {
          const newfromaccount = await AccountSchema.findOne({ userId: req.userId, _id: fromaccountId });
          const fromaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.fromaccountId });
          fromaccount.balance += record.amount;
          newfromaccount.balance -= record.amount;
          await fromaccount.save();
          await newfromaccount.save();
        }
      }
      else if (!fromaccountId && toaccountId) {
        if (amount) {
          const fromaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.fromaccountId });
          const newtoaccount = await AccountSchema.findOne({ userId: req.userId, _id: toaccountId });
          const toaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.toaccountId });
          fromaccount.balance += record.amount;
          toaccount.balance -= record.amount;
          record.amount = amount;
          fromaccount.balance -= record.amount;
          newtoaccount.balance += record.amount;
          await fromaccount.save();
          await toaccount.save();
          await newtoaccount.save();
        }
        else {
          const newtoaccount = await AccountSchema.findOne({ userId: req.userId, _id: toaccountId });
          const toaccount = await AccountSchema.findOne({ userId: req.userId, _id: record.toaccountId });
          toaccount.balance -= record.amount;
          newtoaccount.balance += record.amount;
          await toaccount.save();
          await newtoaccount.save();
        }
      }
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