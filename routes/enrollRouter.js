const { Router } = require("express");
const { getEnrollCourse } = require("../controllers/enrollController");

const enrollRouter = Router();

enrollRouter.get("/:id", getEnrollCourse);

module.exports = enrollRouter;
