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

  const courseRows = await db.findCourseById(courseID);

  const safeResult = safeDestructure(courseRows);
  const { course_name, course_id } = safeResult;

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
  res.redirect("/students");
};

function safeDestructure(arr) {
  if (arr.length < 1) {
    //CODE 0:No Course
    return { course_id: 0, course_name: "No Course" };
  } else {
    const { course_id, course_name } = arr[0];
    return { course_id, course_name };
  }
}
