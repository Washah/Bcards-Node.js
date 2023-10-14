const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const users = require("./routes/users");
const cards = require("./routes/cards");
const favorite = require("./routes/favorite");
const cors = require("cors");
const logger = require("morgan");
const chalk = require("chalk")


const PORT = process.env.PORT || 5501;
const app = express();

mongoose
  .connect(process.env.DB_LOCAL, { useNewUrlParser: true })
  .then(() => console.log(chalk.bgBlue("MongoDB connected")))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(express.json());
app.use(cors());
app.use(logger("common"));


app.use("/api/users", users);
app.use("/api/cards", cards);
app.use("/api/favorite", favorite);
app.get("*", (req, res) => {
  res.send("No existing route...")
})
