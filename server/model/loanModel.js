const mongoose = require("mongoose");
const { Schema } = mongoose;

const LoanSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  loanDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: null },
  isReturned: { type: Boolean, default: false },
});

module.exports = mongoose.model("Loan", LoanSchema);
