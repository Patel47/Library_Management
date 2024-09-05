const express = require("express");
const passport = require("passport");
const setAuthHeader = require("../middleware/accessTokenAutoRefresh");
const isAdmin = require("../middleware/checkAdmin");
const bookController = require("../controller/bookController");

require("../config/passport-stretegy-jwt");
const router = express.Router();
// Get all books
router.get(
  "/book",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  bookController.getAllBooks
);

// create book
router.post(
  "/book",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  bookController.addBook
);

// get book by id
router.get(
  "/book/:id",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  bookController.getBook
);

// update book
router.put(
  "/book/:id",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  bookController.updateBook
);

// delete book
router.delete(
  "/book/:id",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  bookController.deleteBook
);
module.exports = router;
