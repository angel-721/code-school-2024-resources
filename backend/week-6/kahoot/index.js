const express = require("express");
const model = require("./model");
const cors = require("cors");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(
  session({
    secret:
      "jdflkadjflkenflkneaifn3i40138uruinflkani3ojroi1jlk1nlk1jl32kkldjlkan",
    saveUninitialized: true,
    resave: false,
  }),
);

app.use(cors());

app.post("/users", async (req, res) => {
  try {
    let newUser = await new model.User({
      email: req.body.email,
      name: req.body.name,
    });

    // set password to hash
    await newUser.setPassword(req.body.password);

    //server-side validation
    const error = await newUser.validateSync();
    if (error) {
      console.log(error);
      return res.status(422).send(error);
    }

    await newUser.save();

    res.status(201).send("New user created.");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    let users = await model.User.find({}, { password: 0 });
    res.send(users);
  } catch (error) {
    res.status(404).send("Users not found.");
  }
});

// logging in
app.post("/session", async (request, response) => {
  try {
    // STEP 1 find the user via their email
    let user = await model.User.findOne({ email: request.body.email });
    //STEP 2 if the user sends a email not in the database
    if (!user) {
      return response.status(401).send("Authentication failure");
    }

    // STEP 3 Check if they gave us the right password
    let isGoodPassword = await user.verifyPassword(request.body.password);
    if (!isGoodPassword) {
      return response.status(401).send("Authentication failure");
    }

    // Now we need to set the cookie
    request.session.userID = user._id;

    response.status(201).send("You're logged in!");
  } catch (error) {
    response.status(500);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}...`);
});

