const BookSchema = require("../models/Book");

exports.addBook = async (req, res) => {
  const userId = req.userId;
  const { title, author, category, description, rating, link, coverImage } = req.body;

  try {
    if (!title || !author || !link) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const Book = BookSchema({
      title,
      author,
      category,
      description,
      rating,
      link,
      coverImage
    });

    await Book.save();
    res.status(200).json({ message: "Book Added" });
    console.log(Book);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getBook = async (req, res) => {
  try {
    const Book = await BookSchema.find().sort({ createdAt: -1 });
    res.status(200).json(Book);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchBook = async (req, res) => {
  const { bookId } = req.params;
  const { title, author, category, description, rating, link, coverImage } = req.body;
  try {
        const Book = await BookSchema.findById({ _id: bookId });
        if (!Book) {
            return res.status(404).json({ message: "Book not found!" });
        }

        if (title) Book.title = title;
        if (author) Book.author = author;
        if (category) Book.category = category;
        if (rating) Book.rating = rating;
        if (link) Book.link = link;
        if (description) Book.description = description;
        if (coverImage) Book.coverImage = coverImage;

        await Book.save();

        res.status(200).json({ message: "Book updated successfully", Book });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteBook = async (req, res) => {
  const { bookId } = req.params;
  BookSchema.findOneAndDelete({ _id:bookId })
    .then((Book) => {
      res.status(200).json({ message: "Book Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};