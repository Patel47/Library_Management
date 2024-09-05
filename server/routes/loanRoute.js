const express = require("express");
const passport = require("passport");
const setAuthHeader = require("../middleware/accessTokenAutoRefresh");
const isAdmin = require("../middleware/checkAdmin");
const loanController = require("../controller/loanController");

require("../config/passport-stretegy-jwt");

const router = express.Router();

// create loan
router.post(
  "/loan",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  loanController.createLoan
);

// get all loan
router.get(
  "/loan",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  loanController.getAllLoan
);

// return a book
router.put(
  "/loan",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  loanController.returnBook
);

module.exports = router;
