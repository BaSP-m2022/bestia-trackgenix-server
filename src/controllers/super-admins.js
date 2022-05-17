import SuperAdmins from '../models/Super-admins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const allSuperAdmins = await SuperAdmins.find({});
    res.status(200).json({
      msg: 'All SuperAdmins are:',
      data: allSuperAdmins,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};
const getSuperAdminsById = async (req, res) => {
  try {
      const SuperAdmin = await SuperAdmins.findById(req.params.id);
    if (SuperAdmin) {
      res.status(200).json({
        msg: `The Super Admin with id ${req.params.id} is:`,
        data: SuperAdmin,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `No admin with id ${req.params.id}`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};
const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmins({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super Admin created',
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
const deleteSuperAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing Id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await SuperAdmins.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The Super Admin with ID ${req.params.id} has not been found`,
        data: undefined,
        error: true,
      });
    } return res.status(200).json({
      message: 'The Super Admin has been successfully deleted',
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
const updateSuperAdmin = async (req, res) => {
  try {
    const superAdminExist = await SuperAdmins.findById(req.params.id);
    if (superAdminExist) {
      const superAdmin = new SuperAdmins({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        active: req.body.active,
      });
      const result = await superAdmin.save();
      return res.status(201).json({
        message: 'Super Admin updated successfully',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Super Admin with id: ${req.params.id} not found.`,
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
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmin,
  deleteSuperAdmin,
  updateSuperAdmin,
};
