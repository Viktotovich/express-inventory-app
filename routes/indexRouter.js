const { Router } = require("express");
const getHomePage = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getHomePage);

module.exports = indexRouter;
