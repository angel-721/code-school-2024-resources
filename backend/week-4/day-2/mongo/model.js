const mongoose = require("mongoose");

let uriencodePass = encodeURIComponent("12345");

mongoose.connect(
  `mongodb+srv://angel:${uriencodePass}@cluster0.rfftoxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
);

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student must have a name."],
  },
  major: {
    type: String,
    required: [true, "Student must have a major."],
  },
  age: {
    type: Number,
    required: false,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = {
  Student: Student,
};

