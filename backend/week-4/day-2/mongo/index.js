const express = require("express");
const app = express();
const model = require("./model");

// use MiddleWare
app.use(express.urlencoded({ extended: true }));

app.get("/students", async (request, response) => {
  // get data from mongoDB
  let students = await model.Student.find();

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.json(students);
});

app.post("/students", function (request, response) {
  console.log(request.body);
  const data = request.body;

  // create a new MongoStudent using our model
  let newStudent = new model.Student({
    name: data.name,
    major: data.major,
  });

  newStudent
    .save()
    .then(() => {
      // if the new Student saved right
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.status(201).send("Created");
    })
    .catch(() => {
      // if something goes wrong when saving a student
      response.status(400).send("Something failed when making a student");
    });
});

app.delete("/students/:id", (req, res) => {
  console.log("DELETE for single student");
  console.log(req.params.id);
  model.Student.findOneAndDelete({ _id: req.params.id })
    .then((student) => {
      if (student) {
        res.status(200).send("Removed");
      } else {
        console.log("Student not found.");
        res.status(404).send("Student not found.");
      }
    })
    .catch(() => {
      console.log("Bad request (GET by ID).");
      res.status(400).send("Student not found.");
    });
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

