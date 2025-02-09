require("dotenv").config();
const express = require("express");
const path = require("node:path");
//call the routers here

const app = express();
const PORT = process.env.port;
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Router instances

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .send(
      `Hey there, not sure what the error is - but it looks like (if you can understand it): ${err}`
    );
});
