const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const shopRouter = require("./api/routes/shop.route");
const categoryRouter = require("./api/routes/category.route");
const itemRouter = require("./api/routes/item.route");

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/arsal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  });
app.get("/", (req, res) => {
  res.send("Welcome to server.");
});

app.use("/api/shop", shopRouter);
app.use("/api/category", categoryRouter);
app.use("/api/item", itemRouter);


app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
