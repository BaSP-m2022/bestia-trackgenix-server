import ProjectModel from '../models/Projects';

// Create project
const createProject = async (req, res) => {
  try {
    const project = new ProjectModel({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      state: req.body.state,
      employees: req.body.employees,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'Project was created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400);
  }
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//       data: undefined,
//       error: false,
//     });
//   }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const project = await ProjectModel.find();
    res.status(200).json({
      message: 'Projects found',
      data: project,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// Get project by id
const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await ProjectModel.findById(req.params.id);
      if (!project) {
        res.status(404).json({
          message: 'Project not found',
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: 'Project found',
        data: project,
        error: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    if (!projectId) {
      return res.status(400).send({
        message: 'Missing ID parameter',
        data: undefined,
        error: true,
      });
    }
    const searchProject = await ProjectModel.findByIdAndDelete(projectId);
    if (!searchProject) {
      return res.status(404).json({
        message: `The project with id ${req.params.id} has not been found`,
        data: undefined,
        error: true,
      });
    } return res.status(204).json({
      message: 'Project deleted successfully.',
      data: searchProject,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Id not found',
        data: undefined,
        error: true,
      });
    }
    const result = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Project updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
};
