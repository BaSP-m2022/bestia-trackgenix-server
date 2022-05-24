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
    return res.status(400).json({
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
    return res.status(204).json({
      message: 'Project was deleted',
      data: searchProject,
      error: false,
    });
  } catch (error) {
    return res.send({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const allProjects = await ProjectModel.find({});
    return res.status(200).json({
      message: 'Project found',
      data: allProjects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has occurred',
      data: undefined,
      error: true,
    });
  }
};

// Get project by id
const getProjectById = async (req, res) => {
  try {
    const ProjectById = await ProjectModel.findOne(req.param.id);
    if (!getProjectById) {
      return res.status(404).json({
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project found',
      data: ProjectById,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const result = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!req.params) {
      return res.status(404).json({
        message: 'Project not found',
        data: req.params.id,
        error: true,
      });
    }
    if (!result) {
      return res.status(404).json({
        message: 'Project has not been found',
        data: `id: ${req.params.id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project has been successfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: error.message,
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
