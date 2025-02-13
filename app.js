require("dotenv").config();
const express = require("express");
const path = require("node:path");
//call the routers here
const indexRouter = require("./routes/indexRouter");
const courseRouter = require("./routes/courseRouter");

const app = express();
const PORT = process.env.PORT;
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Router instances
app.use("/", indexRouter);
app.use("/courses", courseRouter);

app.listen(PORT, () => {
  console.log(`Mini LMS is live on PORT ${PORT}!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .send(
      `Hey there, not sure what the error is - but it looks like (if you can understand it): ${err}`
    );
});
