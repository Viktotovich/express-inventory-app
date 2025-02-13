const { Router } = require("express");
const getCoursesPage = require("../controllers/courseController");

const courseRouter = Router();

courseRouter.get("/", getCoursesPage);

module.exports = courseRouter;
