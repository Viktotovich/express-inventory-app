const { Router } = require("express");
const {
  getCoursesPage,
  getCreateCourse,
  postCreateCourse,
  getEditCourse,
  postEditCourse,
} = require("../controllers/courseController");

const courseRouter = Router();

courseRouter.get("/", getCoursesPage);
courseRouter.get("/create", getCreateCourse);
courseRouter.post("/create", postCreateCourse);
courseRouter.get("/edit/:courseID", getEditCourse);
courseRouter.post("/edit/:courseID", postEditCourse);

module.exports = courseRouter;
