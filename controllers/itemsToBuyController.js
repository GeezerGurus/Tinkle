const ItemsToBuySchema = require("../models/ItemToBuy");

exports.addItemsToBuy = async (req, res) => {
  const { userId } = req.params
  const { item, price, currency, isPurchased, purchaseDate, category, description } = req.body;

  try {
    //validations
    if (!userId || !item || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const itemstobuy = ItemsToBuySchema({
      userId,
      item,
      price,
      currency,
      isPurchased,
      purchaseDate,
      category,
      description
    });

    await itemstobuy.save();
    res.status(200).json({ message: "Items To Buy Added" });
    console.log(itemstobuy);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getItemsToBuy = async (req, res) => {
  try {
    const itemstobuy = await ItemsToBuySchema.find().sort({ createdAt: -1 });
    res.status(200).json(itemstobuy);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchItemsToBuy = async (req, res) => {
  const { userId, itemtobuyId } = req.params;
  const { item, price, currency, isPurchased, purchaseDate, category, description } = req.body;
  try {
        const itemstobuy = await ItemsToBuySchema.findOne({ _id: itemtobuyId });
        if (!itemstobuy) {
            return res.status(404).json({ message: "Items To Buy not found!" });
        }

        if (item) itemstobuy.period = period;
        if (currency) itemstobuy.name = currency;
        if (price) itemstobuy.price = price;
        if (isPurchased) itemstobuy.isPurchased = isPurchased;
        if (purchaseDate) itemstobuy.purchaseDate = purchaseDate;
        if (category) itemstobuy.category = category;
        if (description) itemstobuy.description = description;

        await itemstobuy.save();

        res.status(200).json({ message: "Items To Buy updated successfully", Budget });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteItemsToBuy = async (req, res) => {
  const { id } = req.params;
  ItemsToBuySchema.findByIdAndDelete(id)
    .then((itemstobuy) => {
      res.status(200).json({ message: "Items To Buy Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};