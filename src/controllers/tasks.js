import Task from '../models/Tasks';

const createTask = async (req, res) => {
  try {
    const task = new Task({
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      startDate: req.body.startDate,
      status: req.body.status,
    });
    const result = await task.save();
    return res.status(201).json({
      message: 'The task has been created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.status(200).json({
        msg: `The Task with id ${req.params.id} is:`,
        data: task,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `Task with id ${req.params.id} was not found.`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(404).json({
      msg: 'An error has occurred.',
      data: undefined,
      error: true,
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find({});
    res.status(200).json({
      msg: 'All Task are:',
      data: allTask,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'An error has occurred.',
      data: undefined,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The task with ID: ${req.params.id} hasn't been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The task has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskExist = await Task.findById(req.params.id);
    if (taskExist) {
      const task = new Task({
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        startDate: req.body.startDate,
        status: req.body.status,
      });
      const result = await task.save();
      return res.status(201).json({
        message: 'Task updated successfully.',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Task with id ${req.params.id} was not found.`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has occurred.',
      data: undefined,
      error: true,
    });
  }
};

export default {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
};
