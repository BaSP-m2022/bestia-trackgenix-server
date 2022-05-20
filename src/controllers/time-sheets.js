import TimeSheetModel from '../models/Time-sheets';

const getTimeSheetById = async (req, res) => {
  try {
    if (req.params.id) {
      const timeSheet = await TimeSheetModel.findById(req.params.id);
      if (!timeSheet) {
        return res.status(404).json({
          message: `The time sheet with the id ${req.params.id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `The request for the id ${req.params.id} was successful`,
        data: timeSheet,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const createTimeSheet = async (req, res) => {
  try {
    const timeSheet = new TimeSheetModel({
      description: req.body.description,
      day: req.body.day,
      role: req.body.role,
      project: req.body.project,
      task: req.body.task,
      validated: req.body.validated,
      projectManager: req.body.projectManager,
    });
    await timeSheet.save();
    return res.status(201).json({
      message: 'New time-sheet created',
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteTimeSheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await TimeSheetModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The time-sheet with the id ${req.params.id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The time-sheet with id ${req.params.id} has been successfully deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateTimeSheet = async (req, res) => {
  try {
    const timeSheetFound = await TimeSheetModel.findById(req.params.id);
    if (timeSheetFound) {
      const timeSheet = new TimeSheetModel({
        description: req.body.description,
        day: req.body.day,
        role: req.body.role,
        project: req.body.project,
        task: req.body.task,
        validated: req.body.validated,
        projectManager: req.body.projectManager,
      });
      const result = await timeSheet.save();
      return res.status(201).json({
        message: 'Time-sheet updated successfully',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Time-sheet with id ${req.params.id} was not found.`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getTimeSheetById,
  createTimeSheet,
  deleteTimeSheet,
  updateTimeSheet,
};
