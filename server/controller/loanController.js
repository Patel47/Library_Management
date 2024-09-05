const bookModel = require("../model/bookModel");
const loanModel = require("../model/loanModel");

class loanController {
  // create loan
  static createLoan = async (req, res) => {
    try {
      const { user, book } = req.body;

      if (!user || !book) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are require" });
      }

      const existingUserWithBook = await loanModel.findOne({ user, book });
      //   console.log(existingUserWithBook);

      if (existingUserWithBook && !existingUserWithBook.isReturned) {
        return res.status(409).json({
          status: "failed",
          message: "You can not take more then one book at a time",
        });
      }

      await loanModel.deleteMany({ isReturned: true });

      const getCopies = await bookModel.findById(book);

      if (getCopies.copies <= 0) {
        return res.status(409).json({
          status: "failed",
          message: "The book is not available in Library",
        });
      }

      const newLoan = await loanModel.create({
        user,
        book,
      });

      const updatedBook = await bookModel.findByIdAndUpdate(
        book,
        { copies: getCopies.copies - 1 },
        { new: true }
      );

      res.status(201).json({
        status: "Success",
        message: "Loan created successfully",
        loan: newLoan,
        updatedBook: updatedBook,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to create loan, Please try again later",
      });
    }
  };
  // get all loan

  static getAllLoan = async (req, res) => {
    try {
      const loans = await loanModel.find();

      res.status(200).json({
        status: "success",
        loans: loans,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to get loan, Please try again later",
      });
    }
  };

  // return book
  static returnBook = async (req, res) => {
    try {
      const { user, book } = req.body;

      if (!user || !book) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are require" });
      }

      const existingUserWithBook = await loanModel.findOne({ user, book });
      //   console.log(existingUserWithBook);

      if (!existingUserWithBook) {
        return res.status(404).json({
          status: "failed",
          message: "user not found with given book",
        });
      }

      const findBook = await bookModel.findById(existingUserWithBook.book);
      console.log(findBook);

      const newCopies = findBook.copies + 1;

      const updatedBook = await bookModel.findByIdAndUpdate(
        findBook._id,
        {
          $set: { copies: newCopies },
        },
        { new: true }
      );

      await loanModel.deleteOne(existingUserWithBook);

      res.status(200).json({
        status: "success",
        message: "Return book successfully and deleted from loan",
        updatedBook: updatedBook,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to return a book, Please try again later",
      });
    }
  };
}

module.exports = loanController;
