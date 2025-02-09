const pool = require("./pool");

async function getAllCourses() {
  try {
    const { rows } = await pool.query("SELECT * FROM courses");
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

//TODO: Get subjects by student
//GET teachers by student
