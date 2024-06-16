const TransferSchema = require("../models/Transfer");

exports.addTransfer = async (req, res) => {
  const { userId } = req.params
  const { fromAccount, toAccount, amount, currency, payee, date, notes } = req.body;

  const transfer = TransferSchema({
    userId,
    fromAccount,
    toAccount,
    amount,
    currency,
    payee,
    date,
    notes
  });

  try {
    //validations
    if (!userId || !fromAccount || !toAccount || !amount || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    await transfer.save();
    res.status(200).json({ message: "Transfer Added" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  
  console.log(transfer);
};

exports.getTransfer = async (req, res) => {
  try {
    const transfer = await TransferSchema.find().sort({ createdAt: -1 });
    res.status(200).json(transfer);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchTransfer = async (req, res) => {
  const { userId, transferId } = req.params;
  const { fromAccount, toAccount, amount, currency, payee, date, notes } = req.body;
  try {
        const transfer = await Transfer.findOne({ _id: transferId });
        if (!transfer) {
            return res.status(404).json({ message: "Transfer not found!" });
        }

        if (fromAccount) transfer.fromAccount = fromAccount;
        if (toAccount) transfer.toAccount = toAccount;
        if (amount) transfer.amount = amount;
        if (currency) transfer.currency = currency;
        if (payee) transfer.payee = payee;
        if (date) transfer.date = date;
        if (notes) transfer.notes = notes;

        await transfer.save();

        res.status(200).json({ message: "Transfer updated successfully", Budget });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteTransfer = async (req, res) => {
  const { id } = req.params;
  TransferSchema.findByIdAndDelete(id)
    .then((transfer) => {
      res.status(200).json({ message: "Transfer Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};