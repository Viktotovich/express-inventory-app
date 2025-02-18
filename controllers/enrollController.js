const db = require("../db/queries");
const links = require("../links");
const { body, validationResult } = require("express-validator");

module.exports.getEnrollCourse = async function (req, res) {
  const courseId = req.params.id;
  const course = await db.findCourseById(courseId);
  const teachers = await db.getAllTeachers;
  const courseName = course[0].course_name;
  const title = "Enroll for " + courseName;

  res.render("pages/enroll", { title, course: course[0], links, teachers });
};

module.exports.postEnrollCourse = async function (req, res) {
  const courseId = req.params.id;
  const { firstName, lastName } = req.body;
  const fullName = firstName + " " + lastName;
  await db.addStudent(fullName, courseId);
  res.redirect("/");
};
