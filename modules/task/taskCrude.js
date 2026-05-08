const Task = require("../../schema/task.schema.js");

const {
    successResponse,
    errorResponse,
} = require("../../helpers/response/allResponse.js");

const successMessages = require("../../helpers/messages/successMessages.js");
const errorMessages = require("../../helpers/messages/errorMessages.js");


// CREATE TASK
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log("Create Task Request id:", req.user.id);

        const task = new Task({
            title,
            description,
            userId: req.user.id,
        });

        await task.save();

        return successResponse(res, successMessages.SUCCESS003, 201);
    } catch (error) {
        console.log("Create Task Error:", error);

        return errorResponse(
            res,
            errorMessages?.ERROR001 || "Task creation failed",
            500
        );
    }
};


// GET ALL TASKS / FILTER TASKS
const getTasks = async (req, res) => {
    try {
        const { status } = req.query;

        let filter = {
            userId: req.user.id,
        };

        if (status) {
            filter.status = status;
        }

        const tasks = await Task.find(filter).sort({ createdAt: -1 });

        return successResponse(res, successMessages.SUCCESS004, 200, tasks );
    } catch (error) {
        console.log("Get Tasks Error:", error);

        return errorResponse(
            res,
            errorMessages?.ERROR001,
            500
        );
    }
};


// UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: id,
                userId: req.user.id,
            },
            req.body,
            { new: true }
        );

        if (!updatedTask) {
            return errorResponse(res, errorMessages.ERR0015, 404);
        }

        return successResponse(res, successMessages.SUCCESS006, 200 );

    } catch (error) {
        console.log("Update Task Error:", error);

        return errorResponse(res, errorMessages.ERROR001, 500);
    }
};


// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findOneAndDelete({
            _id: id,
            userId: req.user.id,
        });

        if (!deletedTask) {
            return errorResponse(res, errorMessages.ERR0015, 404);
        }

        return successResponse(res, successMessages.SUCCESS005, 200);
    } catch (error) {
        console.log("Delete Task Error:", error);
        return errorResponse(res, errorMessages.ERROR001, 500);
    }
};


// MARK COMPLETE / PENDING
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: id,
                userId: req.user.id,
            },
            {
                status,
            },
            { new: true }
        );

        if (!updatedTask) {
            return errorResponse(res, errorMessages.ERR0015, 404);
        }

        return successResponse(res, successMessages.SUCCESS006, 200 );
    } catch (error) {
        console.log("Update Status Error:", error);

        return errorResponse(res, errorMessages.ERROR001, 500);
    }
};
const editTask = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const {
      title,
      description,
    } = req.body;

    if (
      !title?.trim()
    ) {
      return errorResponse(
        res,
        {
          message:
            "Title is required",
        },
        400
      );
    }

    const updatedTask =
      await Task.findOneAndUpdate(
        {
          _id: id,
          userId:
            req.user.id,
        },
        {
          title,
          description,
        },
        {
          new: true,
        }
      );

    if (
      !updatedTask
    ) {
      return errorResponse(
        res,
        errorMessages.ERR0015,
        404
      );
    }

    return successResponse(
      res,
      {
        code:
          "SUCCESS007",
        message:
          "Task updated successfully",
      },
      200,
      updatedTask
    );
  } catch (error) {
    console.log(
      "Edit Task Error:",
      error
    );

    return errorResponse(
      res,
      errorMessages.ERROR001,
      500
    );
  }
};

module.exports = {
    createTask,
    getTasks,
    editTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
};