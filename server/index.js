const express = require("express");
require("dotenv").config();
const connectDb = require("./config/connectDb");
const passport = require("passport");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const bookRoute = require("./routes/bookRoute");
const loanRoute = require("./routes/loanRoute");
const cookieParser = require("cookie-parser");
require("./config/passport-stretegy-jwt");
const app = express();
app.use(cookieParser());
// adding comment for testing

connectDb();
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());

// user routes
app.use("/api/user", userRoute);

// admin routes
app.use("/api/admin", userRoute);

// Category routes (admin route)
app.use("/api/admin", categoryRoute);

// Book routes (admin route)
app.use("/api/admin", bookRoute);
app.use("/api", bookRoute);

// Loan route (admin only)
app.use("/api/admin", loanRoute);

// app.use(errorHandler);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
