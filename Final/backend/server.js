const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/users");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
 app.use(require("./routes/record"));
 const db = require("./db/keys").mongoURI;
 const db2 = require("./db/conn");
// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  db2.connectToServer(function (err) {
    if (err) console.error(err);
  });
  

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./db/passport")(passport);
// Routes
app.use("/routes/users", users);
app.use(require("./routes/record"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} !`));