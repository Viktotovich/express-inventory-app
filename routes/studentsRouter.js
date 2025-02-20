const { Router } = require("express");
const studentController = require("../controllers/studentController");

const studentRouter = Router();

studentRouter.get("/", studentController.getStudents);

module.exports = studentRouter;
