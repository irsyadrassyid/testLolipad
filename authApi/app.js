const express = require("express");
const authRoute = require("./app/auth/router");
const app = express();
const db = require("./database/db");
const dotenv = require("dotenv");
const { decodeToken } = require("./midleware/verifyToken");

dotenv.config();
app.use(express.urlencoded({ extended: true }));
// check database
db.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
);
//  decoder Token
app.use(decodeToken());

//  AUTH
app.use("/auth", authRoute);

// HOME
app.use("/", (req, res) => {
  res.send("server running");
});

app.listen(4500, () => console.log("port bejalan di 4500"));
