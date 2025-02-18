const { Router } = require("express");
const {
  getTeachers,
  getTeachersRegister,
  postTeachersRegister,
} = require("../controllers/teacherController");

const teacherRouter = Router();

teacherRouter.get("/", getTeachers);
teacherRouter.get("/register", getTeachersRegister);
teacherRouter.post("/register", postTeachersRegister);

module.exports = teacherRouter;
