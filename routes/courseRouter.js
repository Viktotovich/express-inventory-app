const { Router } = require("express");
const {
  getCoursesPage,
  getCreateCourse,
  postCreateCourse,
  getEditCourse,
} = require("../controllers/courseController");

const courseRouter = Router();

courseRouter.get("/", getCoursesPage);
courseRouter.get("/create", getCreateCourse);
courseRouter.post("/create", postCreateCourse);
courseRouter.get("/edit/:courseID", getEditCourse);

module.exports = courseRouter;
