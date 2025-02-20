const { Router } = require("express");
const studentController = require("../controllers/studentController");

const studentRouter = Router();

studentRouter.get("/", studentController.getStudents);
studentRouter.get(
  "/change/:courseID/:studentID",
  studentController.getStudentsChange
);
studentRouter.post(
  "/change/:courseID/:studentID",
  studentController.postStudentsChange
);

module.exports = studentRouter;
