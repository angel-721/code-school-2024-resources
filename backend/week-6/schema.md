```JavaScript
{
    "title": "test quiz2",
    "description": "this is a test quiz with questions",
    "questions": [
        {
            "questionText": "this is a question text",
            "possibleChoices": [
                {
                    "answerText": "this is an answer to a question",
                    "isCorrect": false
                },
                {
                    "answerText": "this is an answer to a question and it's correct",
                    "isCorrect": true
                }
            ]
        }
    ]
}
```

Here is GET and GET/id for quizzes
```JavaScript
app.get("/quizzes", async function (req, res) {
  try {
    let quizzes = await model.Quiz.find();
    if (!quizzes) {
      res.status(404).send("Quizzes Not Found");
      return;
    }
    res.json(quizzes);
  } catch (error) {
    console.log(error);
    res.status(404).send("Quizzes Not Found");
  }
});

app.get("/quizzes/:quizID", async function (req, res) {
  try {
    console.log(req.params.quizID);
    let quiz = await model.Quiz.find({ _id: req.params.quizID });
    console.log(quiz);
    if (!quiz) {
      console.log("Quiz not found.");
      res.status(404).send("Quiz not found.");
      return;
    }

    res.json(quiz);
  } catch (error) {
    console.log(error);
    console.log("Bad request (GET quiz).");
    res.status(400).send("Quiz not found.");
  }
});
```


Create a Mongoose schema structured like this HTTP JSON request body.

Name the schema ```QuizSchema```, name the model ```Quiz```, and the endpoint ```quizzes```

Hints:
 - title,owner,description, questions
 - Assume title, and owner are required
 - For owner think about populate, look at the Discord server example about how server's had members but isntead of an array, just have a single owner
 - questions is not required but the questionText is and in questions[i].possibleChoices the answerText and isCorrect are requried.
 - questions is an array and questions[i].possibleChoices is a array inside questions. Look at the pets example to see how you set up list that also declares a schema.

HINT: Here is a example code for nested schemas. 
```JavaScript
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
  pets: [
    {
      pet_name: { type: String, required: [true, "Pet must exist"] },
      foods: [{ type: String }],
    },
  ],
});
```

HINT - when making a new quiz from the model, get the userID from the cookie to save it.

This means you should post to /session first to get your cookie before posting to quizzes
```JavaScript
// post to session to log in before making a Quiz
newquiz = model.Quiz.new({
	owner: request.session.userID
})
```
