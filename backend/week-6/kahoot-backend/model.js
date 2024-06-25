const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

mongoose.connect(process.env.DATABASE);

const QuizSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz must have a title."],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A quiz needs a person"],
    },
    description: String,
    questions: [
      {
        questionText: {
          type: String,
          required: [true, "Question cannot be blank."],
        },
        possibleChoices: [
          {
            answerText: {
              type: String,
              required: [true, "Possible answer choice cannot be blank."],
            },
            isCorrect: {
              type: Boolean,
              required: [
                true,
                "An answer must be correct or not (true/false).",
              ],
            },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

const UserSchema = Schema({
  email: {
    type: String,
    required: [true, "User must have an email."],
  },
  name: String,
  password: {
    type: String,
    required: [true, "User must have a password."],
  },
});

UserSchema.methods.setPassword = async function (plainPassword) {
  try {
    let encryptedPassword = await bcrypt.hash(plainPassword, 12);
    this.password = encryptedPassword;
  } catch (error) {
    console.log("Invalid password, can't set password");
  }
};

UserSchema.methods.verifyPassword = async function (plainPassword) {
  let isOkay = await bcrypt.compare(plainPassword, this.password);
  return isOkay;
};

const User = mongoose.model("User", UserSchema);
const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = {
  Quiz: Quiz,
  User: User,
};

