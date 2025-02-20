const db = require("../db/queries");
const links = require("../links");

module.exports.getStudents = async function (req, res) {
  const title = "Proudly presenting: Our Students";
  const rows = await db.getStudentsWithCoursesAndTeachers();
  res.render("pages/students.ejs", { title, links, rows });
};

module.exports.getStudentsChange = async function (req, res) {
  const { courseID, studentID } = req.params;

  const studentRows = await db.findStudentById(studentID);
  const courseRows = await db.findCourseById(courseID);

  const { student_name, student_id } = studentRows[0];
  const { course_name, course_id } = courseRows[0];

  const courses = await db.getAllCourses();

  const title = "Change course for " + student_name;
  res.render("pages/students-changes.ejs", {
    links,
    title,
    student_name,
    student_id,
    course_name,
    course_id,
    courses,
  });
};

module.exports.postStudentsChange = async function (req, res) {
  const { courseID, studentID } = req.params;
  await db.updateStudentCourse(courseID, studentID);
  res.redirect("/");
};
