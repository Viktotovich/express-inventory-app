const db = require("../db/queries");

const getCoursesPage = async function (req, res) {
  const title = "All courses you would ever need!";
  const courses = await db.getAllCourses();

  //we might need to process the courses,
  res.render("pages/index", { title: title, courses: courses });
};

module.exports = getCoursesPage;
