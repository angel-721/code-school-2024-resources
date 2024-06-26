const express = require("express");
const cors = require("cors");
const model = require("./model");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      callback(null, origin);
    },
  }),
);

app.use(
  session({
    secret: "jhgfoweriwoerodfkvxcvmxvxm12340fsdfkl32f0y0reofasf",
    saveUninitialized: true,
    resave: false,
  }),
);

async function AuthMiddleware(req, res, next) {
  if (req.session && req.session.userID) {
    let user = await model.User.findOne({ _id: req.session.userID });
    if (!user) {
      console.log(user, "You dind't find the user");
      res.status(401).send("Unauthenticated.");
      return;
    }
    req.user = user;
    next();
  } else {
    res.status(401).send("Unauthenticated.");
  }
}

app.post("/session", async function (req, res) {
  try {
    let user = await model.User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send("Authentication failure.");
      return;
    }
    console.log(user);
    let isGoodPassword = await user.verifyPassword(req.body.password);
    if (!isGoodPassword) {
      res.status(401).send("Authentication failure.");
      return;
    }
    req.session.userID = user._id;
    req.session.name = user.name;
    res.status(201).send(req.session);
  } catch (error) {
    console.log(error);
    res.status(400).send("Not found. (Bad email format?)");
  }
});
app.get("/session", AuthMiddleware, async function (req, res) {
  res.send(req.session);
});

app.post("/users", async function (req, res) {
  try {
    let newUser = await new model.User({
      email: req.body.email,
      name: req.body.name,
    });

    // set password to hash
    await newUser.setPassword(req.body.password);
    const error = await newUser.validateSync();

    if (error) {
      res.status(422).send(error);
      console.log(error);
      return;
    }

    await newUser.save();

    res.status(201).send("New user created.");
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
});

app.get("/users", async function (req, res) {
  try {
    let users = await model.User.find({}, { password: 0 });
    res.send(users);
  } catch (error) {
    res.status(404).send("Users not found.");
  }
});

app.get("/users/:userID", async function (req, res) {
  try {
    let user = await model.User.findOne(
      { _id: req.params.userID },
      { password: 0 },
    );
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

app.put("/users/:userID", AuthMiddleware, async function (req, res) {
  console.log("PUT /USERS");
  try {
    let user = await model.User.findOne({ _id: req.params.userID });
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    user.email = req.body.email;
    user.name = req.body.name;
    if (req.body.password !== user.password)
      await user.setPassword(req.body.password);

    const error = await user.validateSync();

    if (error) {
      res.status(422).send(error);
      console.log(error);
      return;
    }

    await user.save();
    res.status(204).send();
  } catch (error) {
    res.status(422).send(error);
  }
});

app.delete("/users/:userID", AuthMiddleware, async function (req, res) {
  try {
    let isDeleted = await model.User.findOneAndDelete({
      _id: req.params.userID,
    });
    if (!isDeleted) {
      res.status(404).send("User Not Found");
      return;
    }
    res.status(204).send("Removed");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.delete("/session", function (req, res) {
  req.session.userID = undefined;
  req.session.name = undefined;
  res.status(204).send();
});

// GET

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

// POST

app.post("/quizzes", AuthMiddleware, async function (req, res) {
  try {
    const newQuiz = new model.Quiz({
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions,
      owner: req.user._id,
    });

    const error = await newQuiz.validateSync();
    if (error) {
      res.status(422).send(error);
      console.log(error);
      return;
    }

    await newQuiz.save();
    res.status(201).send("Created quiz.");
  } catch (error) {
    console.error(error);
    res.status(422).send(error);
  }
});

// PUT

app.put("/quizzes/:quizID", AuthMiddleware, async function (req, res) {
  try {
    let quiz = await model.Quiz.findOne({
      _id: req.params.quizID,
      owner: req.user._id,
    }).populate("owner");

    if (!quiz) {
      res.status(404).send("Quiz not found");
      return;
    }

    console.log(req.user._id);
    console.log(quiz.owner._id);
    if (req.user._id.toString() !== quiz.owner._id.toString()) {
      res.status(403).send("Not Authenticated");
      return;
    }

    quiz.title = req.body.title;
    quiz.description = req.body.description;
    quiz.questions = req.body.questions;

    const error = await quiz.validateSync();
    if (error) {
      res.status(422).send(error);
      console.log(error);
      return;
    }
    await quiz.save();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
});

// DELETE
app.delete("/quizzes/:quizID", AuthMiddleware, async function (req, res) {
  try {
    let isDeleted = await model.Quiz.findOneAndDelete({
      _id: req.params.quizID,
      owner: req.user._id,
    });
    if (!isDeleted) {
      res.status(404).send("Quiz Not Found");
      return;
    }
    res.status(204).send("Removed");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}...`);
});

