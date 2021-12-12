const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../db/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User");
const recordRoutes = express.Router();
const ObjectId = require("mongodb").ObjectId;
const dbo = require("../db/keys");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        return res.status(400).json({ username: "username already exists" });
      } else {
        const newUser = new User({
          //name: req.body.name,
          username: req.body.username,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const username = req.body.username;
    const password = req.body.password;
  // Find user by username
    User.findOne({ username }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ usernamenotfound: "username not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  //This section will help you get a list of all the users.
//   router.route("/record").get(function (req, res) {
//   let db_connect = dbo.getDb("employees");
//   db_connect
//     .collection("users")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });
// router.post('/record').get((req, res) => {
// 	User.find(function(err, users) {
// 		if (err)
// 			res.send(err)
// 		res.json(users);
// 	});
// });

  module.exports = router;