const RecordSchema = require("../models/Record");
const AccountSchema = require("../models/Account");
const BudgetSchema = require("../models/Budget");

exports.addRecord = async (req, res) => {
  const userId = req.userId;
  const { accountId, fromaccountId, toaccountId, budgetId, type, amount, category, date, transactor, notes, time } = req.body;

  try {
    if (type === "transfer") {
      if (!fromaccountId || !toaccountId) {
        return res.status(400).json({ message: "From account and to account are required for transfers!" });
      }
      if (fromaccountId === toaccountId) {
        return res.status(400).json({ message: "Two accounts cannot share the same account." });
      }
    } else {
      if ((accountId && budgetId) || (!accountId && !budgetId)) {
        return res.status(400).json({ message: "Choose either account or budget!" });
      }
    }
    if (!amount || !date || (!accountId && !budgetId && type !== "transfer") || !type) {
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
        account.balance += Number(amount);
        await account.save();
      }
      if (budgetId) {
        const budget = await BudgetSchema.findOne({ userId: req.userId,  _id: budgetId });
        if (!budget) {
          return res.status(400).json({ message: "Budget account not found!" });
        }
        budget.amount += Number(amount);
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
      toaccount.balance += Number(amount);
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
      time
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
  } catch (error) {
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
    const updateBalance = async (accountId, delta) => {
      console.log("after")
      const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
      if (!account) {
        throw new Error("Account not found!");
      }
      account.balance += Number(delta);
      await account.save();
      console.log(account.balance);
    };
    
    const updateBudget = async (budgetId, delta) => {
      const budget = await BudgetSchema.findOne({ userId: req.userId, _id: budgetId });
      if (!budget) {
        throw new Error("Budget not found!");
      }
      budget.amount += Number(delta);
      await budget.save();
    };
    
    const revertOldBalances = async () => {
      if (record.type === "income") {
        if (record.accountId) await updateBalance(record.accountId, -record.amount);
        if (record.budgetId) await updateBudget(record.budgetId, -record.amount);
      } else if (record.type === "expense") {
        if (record.accountId) await updateBalance(record.accountId, record.amount);
        if (record.budgetId) await updateBudget(record.budgetId, record.amount);
      }
    };
    
    const adjustBalancesForTypeChange = async () => {
      if (record.type !== type) {
        await revertOldBalances();
        if (type === "income") {
          if (record.accountId) await updateBalance(record.accountId, record.amount);
          if (record.budgetId) await updateBudget(record.budgetId, record.amount);
        } else if (type === "expense") {
          if (record.accountId) await updateBalance(record.accountId, -record.amount);
          if (record.budgetId) await updateBudget(record.budgetId, -record.amount);
        }
        record.type = type;
      }
    };
    
    const adjustBalancesForAccountChange = async () => {
      if (accountId && record.accountId !== accountId) {
        await revertOldBalances();
        await updateBalance(accountId, record.amount * (record.type === "income" ? 1 : -1));
        record.accountId = accountId;
      }
    };
    
    const adjustBalancesForBudgetChange = async () => {
      if (budgetId && record.budgetId !== budgetId) {
        await revertOldBalances();
        await updateBudget(budgetId, record.amount * (record.type === "income" ? 1 : -1));
        record.budgetId = budgetId;
      }
    };
    
    const adjustAmount = async () => {
        if (record.type === "income") {
          if (record.accountId) {
            await updateBalance(record.accountId, amount);
          }
          if (record.budgetId) {
            await updateBudget(record.budgetId, amount);
          }
        } else if (record.type === "expense") {
          if (record.accountId) {
            await updateBalance(record.accountId, -amount);
          }
          if (record.budgetId) {
            await updateBudget(record.budgetId, -amount);
          }
        }
        record.amount = amount;
    };

    const adjustTransferAccounts = async () => {
        // Reverting accounts balance back to its original amount
        await updateBalance(record.fromaccountId, record.amount);
        await updateBalance(record.toaccountId, -record.amount);
        
        // Update the record with new values if provided
        if (amount && record.amount !== amount) { 
            record.amount = amount;
        }
        if (fromaccountId && record.fromaccountId !== fromaccountId) {
            record.fromaccountId = fromaccountId;
        }
        if (toaccountId && record.toaccountId !== toaccountId) {
            record.toaccountId = toaccountId;
        }

        // Update the new balances with the updated record amount
        
        await updateBalance(record.fromaccountId, -record.amount);
        await updateBalance(record.toaccountId, record.amount);
    };
    
    if ( (type && record.type !== "transfer") && (amount || budgetId || accountId) ) {
      await revertOldBalances();
      if (amount) {
        await adjustAmount();
      }
      if (type) {
        await adjustBalancesForTypeChange();
      }
      if (accountId) {
        await adjustBalancesForAccountChange();
      }
      if (budgetId) {
        await adjustBalancesForBudgetChange();
      }
       // Update other fields
      if (category) record.category = category;
      if (date) record.date = date;
      if (transactor) record.transactor = transactor;
      if (notes) record.notes = notes;
      if (time) record.time = time;
      await record.save();
      
    } else if (record.type === "transfer"){
      console.log("Outside")
      if (amount || fromaccountId || toaccountId) {
        console.log("Inside")
        await adjustTransferAccounts();
      }
       // Update other fields
      if (category) record.category = category;
      if (date) record.date = date;
      if (transactor) record.transactor = transactor;
      if (notes) record.notes = notes;
      if (time) record.time = time;
      await record.save();
    }

    res.status(200).json({ message: "Record updated successfully", record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  const { recordId } = req.params;
  
  try {

    const revertOldBalances = async () => {
      if (record.type === "income") {
        if (record.accountId) await updateBalance(record.accountId, -record.amount);
        if (record.budgetId) await updateBudget(record.budgetId, -record.amount);
      } else if (record.type === "expense") {
        if (record.accountId) await updateBalance(record.accountId, record.amount);
        if (record.budgetId) await updateBudget(record.budgetId, record.amount);
      }
    };
    
    const updateBalance = async (accountId, delta) => {
      console.log("after")
      const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
      if (!account) {
        throw new Error("Account not found!");
      }
      account.balance += Number(delta);
      await account.save();
      console.log(account.balance);
    };
    
    const updateBudget = async (budgetId, delta) => {
      const budget = await BudgetSchema.findOne({ userId: req.userId, _id: budgetId });
      if (!budget) {
        throw new Error("Budget not found!");
      }
      budget.amount += Number(delta);
      await budget.save();
    };

    const record = await RecordSchema.findOne({ userId: req.userId, _id: recordId });
    if (!record) {
      return res.status(404).json({ message: "Record not found!" });
    }
    if (record.type !== "transfer") {
      await revertOldBalances();
    } else {
      await updateBalance(record.fromaccountId, record.amount);
      await updateBalance(record.toaccountId, -record.amount);
    }
    await RecordSchema.findOneAndDelete({ userId: req.userId, _id: recordId });
    res.status(200).json({ message: "Record Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};