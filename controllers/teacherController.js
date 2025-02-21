const db = require("../db/queries");
const links = require("../links");
const { body, validationResult } = require("express-validator");

module.exports.getTeachers = async function (req, res) {
  const teachers = await db.getAllTeachers();
  const title = "Here are all our current teachers:";

  res.render("pages/teachers", { teachers, title, links });
};

module.exports.getTeachersRegister = function (req, res) {
  const title = "Register to become a teacher";

  res.render("pages/teachers-register", { title, links });
};

module.exports.postTeachersRegister = async function (req, res) {
  const { firstName, lastName } = req.body;
  const teacherName = firstName + " " + lastName;
  await db.addTeacher(teacherName);
  res.redirect("/teachers");
};

module.exports.getTeacherAssign = async function (req, res) {
  const { teacherID } = req.params;
  const rows = await db.getCoursesByTeacherId(teacherID);
  const courses = await db.getAllCourses();
  const { current_course, course_id, course_description, teacher_name } =
    rows[0];

  const title = "Assign/Change course for " + teacher_name;
  res.render("pages/teacher-assign.ejs", {
    title,
    links,
    teacher_name,
    current_course,
    course_id,
    course_description,
    courses,
    teacherID,
  });
};

module.exports.postTeacherAssign = async function (req, res) {
  const { teacherID } = req.params;
  const { courseID } = req.body;
  const isEmpty = await db.getCoursesByTeacherId(teacherID);
  if (isEmpty[0].course_id === null) {
    await db.addTeacherCourseRelationship(Number(courseID), Number(teacherID));
    res.redirect("/teachers");
  } else {
    await db.updateTeacherCourse(Number(courseID), Number(teacherID));
    res.redirect("/teachers");
  }
};

module.exports.getTeachersMoreInfo = async function (req, res) {
  const { teacherID } = req.params;
  const rows = await db.getCoursesByTeacherId(teacherID);
  const teacher_id = teacherID;
  const { teacher_name, course_name, course_description } = rows[0];
  const title = "Change details for " + teacher_name;

  res.render("pages/teachers-more-info", {
    teacher_name,
    teacher_id,
    course_name,
    course_description,
    title,
    links,
  });
};
