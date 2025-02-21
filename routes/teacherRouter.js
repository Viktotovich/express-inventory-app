const { Router } = require("express");
const {
  getTeachers,
  getTeachersRegister,
  postTeachersRegister,
  getTeacherAssign,
  postTeacherAssign,
  getTeachersMoreInfo,
} = require("../controllers/teacherController");

const teacherRouter = Router();

teacherRouter.get("/", getTeachers);
teacherRouter.get("/register", getTeachersRegister);
teacherRouter.post("/register", postTeachersRegister);
teacherRouter.get("/assign/:teacherID", getTeacherAssign);
teacherRouter.post("/assign/:teacherID", postTeacherAssign);
teacherRouter.get("/info/:teacherID", getTeachersMoreInfo);

module.exports = teacherRouter;
