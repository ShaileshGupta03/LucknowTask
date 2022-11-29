const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth")
router.get("/", checkAuth, (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json({ UserData: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id",checkAuth, (req, res, next) => {
  User.findById(req.params.id)
    .then((result) => {
      res.status(200).json({ Studentdata: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id",checkAuth, (req, res, next) => {
  console.log(req.params.id);
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        userType: req.body.userType,

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

router.delete("/:id",checkAuth, (req, res, next) => {
  User.remove({ _id: req.params.id })
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
router.post("/signup", (req, res, next) => {
  // bcrypt.hash(plaintextPassword, salt, function(err, hash) {
  //     // Store hash in the database
  // });
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      console.log("hash", hash);
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        // userName: req.body.userName,
        // email: req.body.email,
        password: hash,
        userType: req.body.userType,
        // phone: req.body.phone,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({
            newUser: result,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  });
});
router.post("/login", (req, res, next) => {
  User.find({ name: req.body.name })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({ msg: "user not exist" });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        console.log(req.body.password, user[0], "Password match");
        console.log("result", result);
        if (!result) {
          return res.status(401).json({ msg: "password macthing fail" });
        }
        if (result) {
          const token = jwt.sign(
            {
              name: user[0].name,
              price: user[0].price,
              description: user[0].description,
              userType: user[0].userType,

            },
            "this is dummy text",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            name: user[0].name,
            price: user[0].price,
            description: user[0].description,
            userType: user[0].userType,

            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
