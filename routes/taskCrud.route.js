const express = require("express");
const routes = express.Router();

const { authMiddleware } = require("../middleware/authController.js");

const taskModule = require("../modules/task/taskCrude.js");


routes.post("/create", authMiddleware, taskModule.createTask);


routes.get("/", authMiddleware, taskModule.getTasks);


routes.put("/update/:id", authMiddleware, taskModule.updateTask);


routes.patch("/status/:id", authMiddleware, taskModule.updateTaskStatus);


routes.delete("/delete/:id", authMiddleware, taskModule.deleteTask);

routes.put("/edit/:id", authMiddleware, taskModule.editTask);

module.exports = routes;