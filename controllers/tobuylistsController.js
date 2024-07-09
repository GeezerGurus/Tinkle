const ToBuyListSchema = require("../models/ToBuyList");

exports.addToBuyList = (req, res) => {
  const userId = req.userId;
  const { name, description } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const list = new ToBuyListSchema({
    userId,
    name,
    description,
  });

  list
    .save()
    .then((list) => {
      res.status(200).json({ message: "To Buy List Added", list });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

exports.getToBuyLists = async (req, res) => {
  try {
    const list = await ToBuyListSchema.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    if (!list) {
      return res.status(404).json({ message: "Lists not found!" });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaToBuyList = async (req, res) => {
  const { tobuylistId } = req.params;
  try {
    const tobuylist = await ToBuyListSchema.findOne({
      userId: req.userId,
      _id: tobuylistId,
    });
    if (!tobuylist) {
      return res.status(404).json({ message: "List not found!" });
    }
    res.status(200).json(tobuylist);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchToBuyList = async (req, res) => {
  const { tobuylistId } = req.params;
  const { name, description } = req.body;
  try {
    const tobuylist = await ToBuyListSchema.findOne({
      userId: req.userId,
      _id: tobuylistId,
    });
    if (!tobuylist) {
      return res.status(404).json({ message: "List not found!" });
    }

    if (name !== undefined) tobuylist.name = name;
    if (description !== undefined) tobuylist.description = description;

    await tobuylist.save();

    res.status(200).json({ message: "List updated successfully", tobuylist });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

exports.deleteToBuyList = async (req, res) => {
  const { tobuylistId } = req.params;
  try {
    const list = await ToBuyListSchema.findOneAndDelete({ userId: req.userId, _id: tobuylistId });
    if (!list) {
      return res.status(404).json({ message: "List To Buy not found!" });
    }
    res.status(200).json({ message: "List To Buy Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
