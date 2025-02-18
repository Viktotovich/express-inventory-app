const { Router } = require("express");
const {
  getEnrollCourse,
  postEnrollCourse,
} = require("../controllers/enrollController");

const enrollRouter = Router();

enrollRouter.get("/:id", getEnrollCourse);
enrollRouter.post("/:id", postEnrollCourse);

module.exports = enrollRouter;
