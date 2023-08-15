const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRouter = require("./routes/userRouter");

dotenv.config();
connectDB();
const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

module.exports = app;

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));
