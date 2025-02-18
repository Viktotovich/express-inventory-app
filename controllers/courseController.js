const db = require("../db/queries");
const links = require("../links");
const { body, validationResult } = require("express-validator");

module.exports.getCoursesPage = async function (req, res) {
  const title = "All courses you would ever need, right here - in one place!";
  const courses = await db.getAllCourses();

  //we might need to process the courses,
  res.render("pages/courses", { title: title, courses: courses, links });
};

module.exports.getCreateCourse = async function (req, res) {
  const title = "Create your own course!";
  const courses = await db.getAllCourses();

  res.render("pages/create-course", { title, links, courses: courses });
};

module.exports.postCreateCourse = async function (req, res) {
  const { courseName, courseDescription } = req.body;
  await db.addCourse(courseName, courseDescription);
  res.redirect("/");
};
