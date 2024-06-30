const ItemToBuy = require("../models/ItemToBuy");

exports.addItemsToBuy = (req, res) => {
  const userId = req.userId;
  const { name, quantity, description, price, isPurchased } = req.body;

  // Validations
  if ( !name || !quantity || !price ) {
    return res.status(400).json({ message: "User ID, name, and quantity are required!" });
  }

  const itemToBuy = new ItemToBuy({
    userId,
    name,
    quantity,
    description,
    price,
    isPurchased,
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
  ItemToBuy.find({ userId: req.userId }).sort({ createdAt: -1 })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

exports.patchItemsToBuy = async (req, res) => {
  const { itemtobuyId } = req.params;
  const { name, price, isPurchased, description, quantity } = req.body;
  try {
    const itemstobuy = await ItemToBuy.findOne({ userId: req.userId, _id: itemtobuyId });
    if (!itemstobuy) {
      return res.status(404).json({ message: "Items To Buy not found!" });
    }

    if (name !== undefined) itemstobuy.name = name;
    if (price !== undefined) itemstobuy.price = price;
    if (quantity !== undefined) itemstobuy.quantity = quantity;
    if (isPurchased !== undefined) itemstobuy.isPurchased = isPurchased;
    if (description !== undefined) itemstobuy.description = description;

    await itemstobuy.save();

    res.status(200).json({ message: "Items To Buy updated successfully", itemstobuy });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

exports.deleteItemsToBuy = (req, res) => {
  const { itemtobuyId } = req.params;

  ItemToBuy.findOneAndDelete({ userId: req.userId,_id:itemtobuyId })
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
