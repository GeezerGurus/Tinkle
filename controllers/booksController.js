const BookSchema = require("../models/Book");

exports.addBook = async (req, res) => {
  const { title, author, category, description, link, coverImage } = req.body;

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
      coverImage
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
    const Book = await BookSchema.find({ favourite: false }).sort({ createdAt: -1 });
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
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getFavouriteBooks = async (req, res) => {
  try { 
    const Book = await BookSchema.find({ userId: req.userId, favourite: true }).sort({ createdAt: -1 })
    if (!Book) {
      return res.status(404).json({ message: "Book not found!" });
    }
    return res.status(200).json(Book);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

exports.addFavouriteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
        const book = await BookSchema.findOne({ _id: bookId });
        if (!book) {
            return res.status(404).json({ message: "Book not found!" });
        }

        const favourite_book = BookSchema({
          userId: req.userId,
          title: book.title,
          author: book.author,
          category: book.category,
          description: book.description,
          link: book.link,
          coverImage: book.category,
          favourite: true,
        });
    
        await favourite_book.save();
        res.status(200).json({ message: "Favourite book Added" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteFavouriteBook = async (req, res) => {
  const { bookId } = req.params;
  BookSchema.findOneAndDelete({ userId: req.userId, _id:bookId })
    .then((Book) => {
      res.status(200).json({ message: "Book Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

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