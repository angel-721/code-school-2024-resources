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

  let newStudent = {
    name: data.name,
    major: data.major,
  };

  students.push(newStudent);

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.status(201).send("Created Student");
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
})
