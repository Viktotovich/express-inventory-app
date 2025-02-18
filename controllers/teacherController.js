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
