const ItemToBuy = require("../models/ItemToBuy");

exports.addItemToBuy = (req, res) => {
  const userId = req.userId;
  const { tobuylistId } = req.params
  const { name, description, ispurchased } = req.body;

  if ( !tobuylistId || !name ) {
    return res.status(400).json({ message: " TobuylistId, and name are required!" });
  }

  const itemToBuy = new ItemToBuy({
    userId,
    tobuylistId,
    name,
    description,
    ispurchased
  });

  itemToBuy.save()
    .then((item) => {
      res.status(200).json({ message: "Item To Buy Added", item });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

exports.getItemsToBuy = (req, res) => {
  const { tobuylistId } = req.params;
  ItemToBuy.find({ userId: req.userId, tobuylistId: tobuylistId }).sort({ createdAt: -1 })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

exports.getaItemToBuy = async (req, res) => {
  const { itemtobuyId, tobuylistId } = req.params;
  try {
    const itemtobuy = await ItemToBuy.findOne({ userId: req.userId, tobuylistId: tobuylistId, _id: itemtobuyId});
    if (!itemtobuy) {
      return res.status(404).json({ message: "Item To Buy not found!" });
    }
    res.status(200).json(itemtobuy)
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchItemToBuy = async (req, res) => {
  const { itemtobuyId, tobuylistId } = req.params;
  const { name, description, ispurchased } = req.body;
  try {
    const itemstobuy = await ItemToBuy.findOne({ userId: req.userId, tobuylistId: tobuylistId, _id: itemtobuyId });
    if (!itemstobuy) {
      return res.status(404).json({ message: "Item To Buy not found!" });
    }

    if (name !== undefined) itemstobuy.name = name;
    if (description !== undefined) itemstobuy.description = description;
    if (ispurchased !== undefined) itemstobuy.ispurchased = ispurchased;

    await itemstobuy.save();

    res.status(200).json({ message: "Items To Buy updated successfully", itemstobuy });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

exports.deleteItemToBuy = (req, res) => {
  const { tobuylistId, itemtobuyId } = req.params;
  ItemToBuy.findOneAndDelete({ userId: req.userId, tobuylistId: tobuylistId, _id:itemtobuyId })
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Item To Buy not found!" });
      }
      res.status(200).json({ message: "Item To Buy Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
