const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/users");
//const cors = require("cors");
//require("dotenv").config({ path: "./config.env" });
//const port = process.env.PORT || 5000;
//app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
//app.use(require("./routes/record"));
// get driver connection
//const db = require("./db/conn");
const db = require("./db/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./db/passport")(passport);
// Routes
app.use("/routes/users", users);

const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   // perform a database connection when server starts
//   db.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });
app.listen(port, () => console.log(`Server running on port ${port} !`));