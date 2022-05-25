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
    return res.status(200).json({
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
    const allAdmins = await AdminModel.find(req.query);
    if (allAdmins.length > 0) {
      return res.status(200).json({
        message: 'All Admins are:',
        data: allAdmins,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Cannot show the list of admins.',
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'An error occurred.',
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
        message: 'The admin is:',
        data: admin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Admin was not found.',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'An error has occurred.',
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
        message: 'The Admin has not been found',
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
    if (!req.params) {
      return res.status(400).json({
        msg: 'Id not found',
        data: undefined,
        error: true,
      });
    }
    const updateAdmi = await AdminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updateAdmi) {
      return res.status(404).json({
        msg: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Admin updated',
      data: updateAdmi,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
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
