const express = require("express");
const cors = require("cors");
const model = require("./model");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", async (request, response) => {
  try {
    let users = await model.User.find({}, { password: 0 });
    response.send(users);
  } catch (error) {
    response.status(500).send("Server error");
  }
});

app.get("/servers", async (request, response) => {
  try {
    // let servers = await model.Server.find().populate("members", "-password");
    let servers = await model.Server.find();
    response.send(servers);
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
});

app.post("/users", async (request, response) => {
  try {
    let newUser = await new model.User({
      email: request.body.email,
      name: request.body.name,
      username: request.body.username,
      account_age: request.body.account_age,
    });
    await newUser.hashPassword(request.body.password);

    // server-side validation
    // make sure the request.body has the right data
    const error = await newUser.validateSync();

    if (error) {
      response.status(422).send(error);
      return;
    }

    await newUser.save();
    response.status(201).send("You're a-okay");
  } catch (error) {
    response.status(500).send("Server error");
  }
});

app.post("/servers", async (request, response) => {
  try {
    let newServer = new model.Server({
      name: request.body.name,
      members: request.body.members, // This should be an array of user IDs
    });

    // Validate the new server
    const error = newServer.validateSync();
    if (error) {
      return response.status(422).json(error.errors);
    }

    // populate is super cool and powerful!
    // this gives us the power to insert data from the id's into the object
    // await newServer.populate("members", "name email username");
    await newServer.save();

    response.status(201).json(newServer);
  } catch (error) {
    console.error(error);
    response.status(500).send("Server error");
  }
});

app.listen(8080, function () {
  console.log("server is running on http://localhost:8080...");
});

