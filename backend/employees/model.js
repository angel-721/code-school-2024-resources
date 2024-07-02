const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.DATABASE);

const CompanySchema = Schema({
  name: {
    type: String,
    required: [true, "Company must have an email."],
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "A quiz needs a person"],
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "A quiz needs a person"],
  },
});

const EmployeeSchema = Schema({
  email: {
    type: String,
    required: [true, "User must have an email."],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "User must have an email."],
  },
  jobTitle: {
    type: String,
    enum: ["Programmer", "Artist", "Designer", "CEO"],
  },
  pay: {
    type: Number,
    min: [50000, "Must be at least 50000, got {VALUE}"],
    max: [90000, "We don't have the money to pay over 90k"],
  },
});

const Company = mongoose.model("Company", CompanySchema);
const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = {
  Company,
  Employee,
};

