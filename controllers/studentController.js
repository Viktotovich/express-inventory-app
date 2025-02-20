const db = require("../db/queries");
const links = require("../links");

module.exports.getStudents = async function (req, res) {
  const title = "Proudly presenting: Our Students";
  const rows = await db.getStudentsWithCoursesAndTeachers();
  res.render("pages/students.ejs", { title, links, rows });
};

module.exports.getStudentsChange = async function (req, res) {
  const { studentID } = req.params;

  const studentRows = await db.findStudentById(studentID);
  const { student_name, student_id, student_course } = studentRows[0];

  //to prevent crashing, as many systems rely on the old name of courseID
  const courseID = student_course;

  //it wont find anything if a student doesnt have a pre-assigned course, TODO: figure out how to by-pass that
  const courseRows = await db.findCourseById(courseID);

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
  const { studentID } = req.params;
  const { courseID } = req.body;
  console.dir(req.body);
  console.dir(courseID + "and" + studentID);
  await db.updateStudentCourse(courseID, studentID);
  res.redirect("/");
};
