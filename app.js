const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const student = require("./api/routes/student");
const facalty = require("./api/routes/facalty");
const User = require("./api/routes/user");

// database connection //
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Shailesh:d1zjPHekhyhgKIzS@cluster0.ine2i.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("err", (err) => {
  console.log("database is not connected");
});
mongoose.connection.on("connected", (conncted) => {
  console.log("database is connected");
});
////////////////////////////////////////

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//student request//
app.use("/student", student);
app.use("/facalty", facalty);
app.use("/user", User);

app.post("/", (req, res, next) => {
  console.log(req.body);
});
app.use((req, res, next) => {
  res.status(404).json({
    error: "bad request",
  });
});
module.exports = app;
