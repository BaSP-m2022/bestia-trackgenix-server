import AdminModel from '../models/Admins';

// Create admin
const createAdmin = async (req, res) => {
  try {
    const admin = new AdminModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin created successfully.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has occurred.',
      data: undefined,
      error: true,
    });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await AdminModel.find({});
    res.status(200).json({
      msg: 'All Admins are:',
      data: allAdmins,
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

// Get admin by id
const getAdminById = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (admin) {
      res.status(200).json({
        msg: `The Admin with id ${req.params.id} is:`,
        data: admin,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `Admin with id ${req.params.id} was not found.`,
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

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter.',
        data: undefined,
        error: true,
      });
    }
    const result = await AdminModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The Admin with id ${req.params.id} has not been found`,
        data: undefined,
        error: true,
      });
    } return res.status(200).json({
      message: 'Admin deleted successfully.',
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

// Update admin
const updateAdmin = async (req, res) => {
  try {
    const adminExist = await AdminModel.findById(req.params.id);
    if (adminExist) {
      const admin = new AdminModel({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        active: req.body.active,
      });
      const result = await admin.save();
      return res.status(201).json({
        message: 'Admin updated successfully.',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with id ${req.params.id} was not found.`,
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
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdminById,
};
