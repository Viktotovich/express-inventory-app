const db = require("../db/queries");

const getHomePage = async function (req, res) {
  const title = "Main Page";
  const courses = await db.getAllCourses();
  const teachers = await db.getAllTeachers();
  const students = await db.getAllStudents();

  res.render("pages/index", { title: title, courses, teachers, students });
};

module.exports = getHomePage;
