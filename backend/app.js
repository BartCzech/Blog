const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
var logger = require("morgan");
const connectDB = require("./config/db");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const { notFound, errorHandler } = require("./middleware/errorHandling");

dotenv.config();
connectDB();
const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      });
    } catch (err) {
      return done(err);
    }
  })
);

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
app.post(
  "/api/user/login",
  passport.authenticate("local", {
    session: false,
  }),
  (req, res) => {
    jwt.sign(
      { user: req.user },
      process.env.SECRET_KEY,
      { expiresIn: "30m" },
      (err, token) => {
        res.json({
          message: "alles gut",
          username: req.user.username,
          token: token,
        });
      }
    );
  }
);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`)
);
