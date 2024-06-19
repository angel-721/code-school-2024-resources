const mongoose = require("mongoose");
let uriencodePass = encodeURIComponent("12345");

mongoose.connect(
  `mongodb+srv://angel:${uriencodePass}@cluster0.rfftoxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
);

const ExpenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Expense needs to have a category."],
    },
    amount: {
      type: Number,
      required: [true, "Expense needs to have an amount!"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Expense = mongoose.model("Schema", ExpenseSchema);

module.exports = {
  Expense: Expense,
};

