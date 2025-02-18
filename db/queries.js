const pool = require("./pool");

async function getAllCourses() {
  try {
    const { rows } = await pool.query("SELECT * FROM courses");
    console.dir(rows);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getAllTeachers() {
  try {
    const { rows } = await pool.query("SELECT * FROM teachers");
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getAllStudents() {
  try {
    const { rows } = await pool.query("SELECT * FROM students");
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getStudentsByTeacher(teacherId, teacherName) {
  try {
    const complexQuery = `SELECT student_name, student_id FROM students INNER JOIN teachers ON students.teacher_id = teachers.teacher_id WHERE teachers.teacher_id = $1`; //${teacherID} opens up SQL Injection vulnerabilities
    const { rows } = await pool.query(complexQuery, [teacherId]);
    return { rows, teacherName };
  } catch (err) {
    console.err(err);
  }
}

/*God bless you if you have to touch this without an ORM */
async function getTeachersBySubject(courseId, courseName) {
  try {
    const complexQuery =
      "SELECT teachers.teacher_name, teachers.teacher_id FROM courses INNER JOIN teacher_courses ON teacher_courses.course_id = courses.course_id INNER JOIN teachers ON teacher_courses.teacher_id = teachers.teacher_id WHERE courses.course_id = $1";
    const { rows } = await pool.query(complexQuery, [courseId]);
    return { rows, courseName };
  } catch (err) {
    console.error(err);
  }
}

async function getSubjectByStudent(studentId, studentName) {
  try {
    const complexQuery =
      "SELECT courses.course_name FROM students INNER JOIN courses ON courses.course_id = students.student_course WHERE students.student_id = $1;";
    const { rows } = await pool.query(complexQuery, [studentId]);
    return { studentName, rows };
  } catch (err) {
    console.error(err);
  }
}

/*TODO:
  I might need to refactor all students to use LEFT JOIN because some might not have a teacher or a course yet. Or just force select a starting course
*/
async function getTeacherByStudent(studentId, studentName) {
  try {
    const complexQuery =
      "SELECT teachers.teacher_name FROM students JOIN teachers ON students.teacher_id = teachers.teacher_id WHERE students.student_id = $1";
    const { rows } = await pool.query(complexQuery, [studentId]);
    return { studentName, rows };
  } catch (err) {
    console.error(err);
  }
}

// ADDING
async function addCourse(courseName, courseDescription) {
  try {
    const complexQuery =
      "INSERT INTO courses (course_name, course_description) VALUES ($1, $2)";
    await pool.query(complexQuery, [courseName, courseDescription]);
  } catch (err) {
    console.error(err);
  }
}

async function addTeacher(teacherName) {
  try {
    const complexQuery = "INSERT INTO teachers (teacher_name) VALUES ($1)";
    await pool.query(complexQuery, [teacherName]);
  } catch (err) {
    console.error(err);
  }
}

async function addStudent(studentName, courseId) {
  try {
    const complexQuery =
      "INSERT INTO students (student_name, student_course) VALUES ($1, $2)";
    await pool.query(complexQuery, [studentName, courseId]);
  } catch (err) {
    console.error(err);
  }
}

//FINDING WITH ID
async function findCourseById(courseId) {
  try {
    const complexQuery = "SELECT * FROM courses WHERE course_id = $1";
    const { rows } = await pool.query(complexQuery, [courseId]);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllCourses,
  getAllTeachers,
  getAllStudents,
  getStudentsByTeacher,
  getTeachersBySubject,
  getSubjectByStudent,
  getTeacherByStudent,
  addCourse,
  addTeacher,
  addStudent,
  findCourseById,
};
