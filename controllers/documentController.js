const DocumentSchema = require("../models/Documentation");

exports.addDocument = async (req, res) => {
  const userId = req.userId;
  const { title, author, description, link, category } = req.body;

  try {
    if (!title || !author || !link) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const Document = DocumentSchema({
        title,
        author,
        description,
        link,
        category
    });

    await Document.save();
    res.status(200).json({ message: "Document Added" });
    console.log(Document);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getDocument = async (req, res) => {
  try {
    const Document = await DocumentSchema.find().sort({ createdAt: -1 });
    res.status(200).json(Document);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchDocument = async (req, res) => {
  const { documentId } = req.params;
  const { title, author, description, link, category } = req.body;
  try {
        const Document = await DocumentSchema.findById({ _id: documentId });
        if (!Document) {
            return res.status(404).json({ message: "Document not found!" });
        }

        if (title) Document.title = title;
        if (author) Document.author = author;
        if (link) Document.link = link;
        if (description) Document.description = description;
        if (category) Document.category = category;

        await Document.save();

        res.status(200).json({ message: "Document updated successfully", Document });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteDocument = async (req, res) => {
  const { documentId } = req.params;
  DocumentSchema.findOneAndDelete({ _id:documentId })
    .then((Document) => {
      res.status(200).json({ message: "Document Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};