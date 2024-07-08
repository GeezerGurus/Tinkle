const CategorySchema = require("../models/Category");

exports.addCategory = async (req, res) => {
  const userId = req.userId;
  const { name, icon, color } = req.body;

  try {
    if ( !userId || !name || !icon ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (icon <= 0 || !icon === "number") {
      return res.status(400).json({ message: "Icon must be select!" });
    }

    const category = CategorySchema({
        userId,
        name,
        icon,
        color
      });

    await category.save();
    res.status(200).json({ message: "Category Added" });
    console.log(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await CategorySchema.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await CategorySchema.findOne({ userId: req.userId, _id: categoryId});
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }
    res.status(200).json(category)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.patchCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, icon, color } = req.body;
  try {
        const category = await CategorySchema.findOne({ userId: req.userId, _id: categoryId });
        if (!category) {
            return res.status(404).json({ message: "Category not found!" });
        }

        if (name) category.name = name;
        if (icon) category.icon = icon;
        if (color) category.color= color;

        await category.save();

        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  CategorySchema.findOneAndDelete({ userId: req.userId, _id: categoryId })
    .then((category) => {
      res.status(200).json({ message: "Category Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: error });
    });
};