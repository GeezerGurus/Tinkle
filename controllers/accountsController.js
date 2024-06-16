const AccountSchema = require("../models/Account");

exports.addAccount = async (req, res) => {
  const { userId } = req.params;
  const { name, balance, currency, description } = req.body;

  try {
    if (!userId || !balance || !name ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (balance <= 0 || !balance === "number") {
      return res
        .status(400)
        .json({ message: "Balance amount must be a positive number!" });
    }

    const account = AccountSchema({
      userId,
      name,
      balance,
      currency,
      description
    });

    await account.save();
    res.status(200).json({ message: "Account Added" });
    console.log(account);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const account = await AccountSchema.find().sort({ createdAt: -1 });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchAccount = async (req, res) => {
  const { accountId } = req.params;
  const { name, balance, currency, description } = req.body;
  try {
        const account = await AccountSchema.findOne({ _id: accountId });
        if (!account) {
            return res.status(404).json({ message: "Income not found!" });
        }

        if (name) account.name = name;
        if (balance) account.balance = balance;
        if (currency) account.currency = currency;
        if (description) account.description = description;

        await account.save();

        res.status(200).json({ message: "Account updated successfully", account });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteAccount = async (req, res) => {
  const { accountId } = req.params;
  AccountSchema.findByIdAndDelete(accountId)
    .then((account) => {
      res.status(200).json({ message: "Account Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};