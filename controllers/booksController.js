const BookSchema = require("../models/Book");

exports.addBook = async (req, res) => {
  const { title, author, category, description, link, coverImage,favourite } = req.body;

  try {
    if (!title || !author || !link) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const Book = BookSchema({
      title,
      author,
      category,
      description,
      link,
      coverImage,
      favourite
    });

    await Book.save();
    res.status(200).json({ message: "Book Added" });
    console.log(Book);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const Book = await BookSchema.find().sort({ createdAt: -1 });
    res.status(200).json(Book);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await BookSchema.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }
    res.status(200).json(book)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.getFavouriteBooks = async (req, res) => {
  try { 
    const Book = await BookSchema.find({ userId: req.userId, favourite: true }).sort({ createdAt: -1 })
    res.status(200).jason(Book);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchBook = async (req, res) => {
  const { bookId } = req.params;
  const { title, author, category, description, link, coverImage, favourite } = req.body;
  try {
        const Book = await BookSchema.findOne({ userId: req.userId, _id: bookId });
        if (!Book) {
            return res.status(404).json({ message: "Book not found!" });
        }
        if (req.userId) {
          Book.userId = req.userId;
        } else {
          return res.status(401).json({ error: "Unauthorized" });
        }
        if (title) Book.title = title;
        if (author) Book.author = author;
        if (category) Book.category = category;
        if (link) Book.link = link;
        if (description) Book.description = description;
        if (coverImage) Book.coverImage = coverImage;
        if (favourite) Book.favourite = favourite;

        await Book.save();

        res.status(200).json({ message: "Book updated successfully", Book });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteBook = async (req, res) => {
  BookSchema.findOneAndDelete({ _id:bookId })
    .then((Book) => {
      res.status(200).json({ message: "Book Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};