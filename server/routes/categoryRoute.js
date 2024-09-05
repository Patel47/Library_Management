const express = require("express");
const passport = require("passport");
const setAuthHeader = require("../middleware/accessTokenAutoRefresh");
const isAdmin = require("../middleware/checkAdmin");
const categorycontroller = require("../controller/categoryController");

require("../config/passport-stretegy-jwt");

const router = express.Router();

// create category
router.post(
  "/category",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  categorycontroller.createCategory
);

// get all category
router.get(
  "/Allcategories",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  categorycontroller.getAllCategory
);

// update category
router.put(
  "/category/:id",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  categorycontroller.updateCategory
);

// delete category
router.delete(
  "/category/:id",
  setAuthHeader,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  categorycontroller.deleteCategory
);

module.exports = router;
