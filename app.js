const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/userModel");

const userRouter = require("./routes/userRouter");

dotenv.config();
connectDB();  
const app = express();

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username", // check in Postman
      passwordField: "password", // check in Postman
    },
    async (username, password, done) => {
    try {
      const user = User.findOne({email: username});
      if (!user) {
        return done(null, false, { message: "User not found"});
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) { // passwords match
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password"});
        }
      });
    } catch (error) {
      return done(err);
    }
  })
);
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api", userRouter);

module.exports = app;

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));
