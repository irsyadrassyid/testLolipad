const express = require("express");
const app = express();
const db = require("./database/index");
const LogisticRoute = require("./app/logistic/router");

//
app.use(express.urlencoded({ extended: true }));

// check database
db.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
);

// Logistic Route
app.use("/api", LogisticRoute);

//  HOME
app.use("/", (req, res) => {
  res.send("server logistic running");
});

app.listen(4501, () => console.log("server logistic is running"));
