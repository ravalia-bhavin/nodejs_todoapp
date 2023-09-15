import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js"; //.js

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    // get current logedin user
    const userid = req.user._id;

    // match userId with all user of task table
    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    // get id from the parameters . ex. url : `/user/id_1231` ==> this is id : `id_1231`
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Invalid id!", 500));

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated !",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Invalid id!", 500));

    // await task.remove({});
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted !",
    });
  } catch (error) {
    next(error);
  }
};