const { Router } = require("express");
const studentController = require("../controllers/studentController");

const studentRouter = Router();

studentRouter.get("/", studentController.getStudents);
studentRouter.get("/change/:studentID", studentController.getStudentsChange);
studentRouter.post("/change/:studentID", studentController.postStudentsChange);

module.exports = studentRouter;
