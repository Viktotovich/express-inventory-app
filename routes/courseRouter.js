const { Router } = require("express");
const {
  getCoursesPage,
  getCreateCourse,
  postCreateCourse,
} = require("../controllers/courseController");

const courseRouter = Router();

courseRouter.get("/", getCoursesPage);
courseRouter.get("/create", getCreateCourse);
courseRouter.post("/create", postCreateCourse);

module.exports = courseRouter;
