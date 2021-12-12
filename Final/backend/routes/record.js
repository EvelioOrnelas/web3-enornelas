const express = require("express");
const bcrypt = require('bcrypt');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
// This will help us connect to the database
const dbo = require("../db/conn");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User");
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the users.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    username: req.body.username,
    password: req.body.password,
  };
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(myobj.password, salt, (err, hash) => {
      if (err) throw err;
      myobj.password = hash;
      db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
      });
    });
  });
});
// This section will help you create a new record.
// recordRoutes.route("/record/register").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   // Form validation
//   const { errors, isValid } = validateRegisterInput(req.body);
//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   User.findOne({ username: req.body.username }).then(user => {
//     if (user) {
//       return res.status(400).json({ username: "username already exists" });
//     } else {
//       let myobj = {
//         username: req.body.username,
//         password: req.body.password,
//       };
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(myobj.password, salt, (err, hash) => {
//           if (err) throw err;
//           myobj.password = hash;
//           db_connect.collection("users").insertOne(myobj, function (err, res) {
//             if (err) throw err;
//             response.json(res);
//           });
//         });
//       });
//     };
//   });
// });

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      username: req.body.username,
      password: req.body.password,
    },
  };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newvalues.$set.password, salt, (err, hash) => {
        if (err) throw err;
        newvalues.$set.password = hash;
        db_connect
        .collection("users")
        .updateOne(myquery, newvalues, function (err, res) {
          if (err) throw err;
          console.log("1 document updated");
          response.json(res);
        });
      });
    });
});
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(myobj.password, salt, (err, hash) => {
//     if (err) throw err;
//     myobj.password = hash;
//     db_connect.collection("users").insertOne(myobj, function (err, res) {
//       if (err) throw err;
//       response.json(res);
//     });
//   });

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = recordRoutes;