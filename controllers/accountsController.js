const AccountSchema = require("../models/Account");

exports.addAccount = async (req, res) => {
  const userId = req.userId;
  const { name, balance, type } = req.body;

  try {
    if (!userId || !balance || !name) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(balance) || balance <= 0) {
      return res.status(400).json({ message: "Balance amount must be a positive number!" });
    }

    const account = AccountSchema({
      userId,
      name,
      balance,
      type
    });

    await account.save();
    res.status(200).json({ message: "Account Added" });
    console.log(account);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getAccounts = async (req, res) => {
  try {
    const account = await AccountSchema.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaAccount = async (req, res) => {
  const { accountId } = req.params;
  try {
    const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId});
    if (!account) {
      return res.status(404).json({ message: "Account not found!" });
    }
    res.status(200).json(account)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.patchAccount = async (req, res) => {
  const { accountId } = req.params;
  const { name, balance, currency, description, type } = req.body;
  try {
        const account = await AccountSchema.findOne({ userId: req.userId, _id: accountId });
        if (!account) {
            return res.status(404).json({ message: "Account not found!" });
        }

        if (name) account.name = name;

        if (balance !== undefined) {
          if (isNaN(balance) || balance < 0) {
            return res.status(400).json({ message: "Balance amount must be a positive number!" });
          } else {
            account.balance = balance;
          }
        }
        
        if (currency) account.currency = currency;
        if (description) account.description = description;
        if (type) account.type = type;

        await account.save();

        res.status(200).json({ message: "Account updated successfully", account });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteAccount = async (req, res) => {
  const { accountId } = req.params;
  AccountSchema.findOneAndDelete({ userId: req.userId, _id:accountId })
    .then((account) => {
      res.status(200).json({ message: "Account Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};