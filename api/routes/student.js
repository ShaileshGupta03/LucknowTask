const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../model/student");

// get all data
router.get("/", (req, res, next) => {
  Student.find()
    .then((result) => {
      res.status(200).json({ StudentData: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// get by id data
router.get("/:id", (req, res, next) => {
  Student.findById(req.params.id)
    .then((result) => {
      res.status(200).json({ Studentdata: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// add data by post methods
router.post("/", (req, res, next) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone,
  });
  student
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newStudent: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// delete data by id
router.delete("/:id", (req, res, next) => {
  Student.remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "successfully deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// find one and update
router.put("/:id", (req, res, next) => {
  console.log(req.params.id);
  Student.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
      },
    }
  )
    .then((result) => {
      res.status(200).json({ message: "successfully updated", result: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
