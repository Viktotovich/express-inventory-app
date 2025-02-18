const { Router } = require("express");
const {
  getTeachers,
  getTeachersRegister,
} = require("../controllers/teacherController");

const teacherRouter = Router();

teacherRouter.get("/", getTeachers);
teacherRouter.get("/register", getTeachersRegister);

module.exports = teacherRouter;
