/* eslint-disable no-undef */
const AdminModel = require('../models/Admins');

// Create admin
const createAdmin = async (req, res) => {
  try {
    const adminExist = await AdminModel.findById(req.params.id);
    if (!adminExist) {
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
        message: 'Admin created successfully',
        data: result,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'An admin with that id already exists',
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
        message: 'Admin updated successfully',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with id: ${req.params.id} not found.`,
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

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const adminExist = AdminModel.findByIdAndDelete(req.params.id);
    if (adminExist) {
      return res.status(204).json({
        message: `Admin with id: ${req.params.id} was deleted.`,
        data: undefined,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with id: ${req.params.id} not found.`,
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

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await AdminModel.find({});
    return res.status(200).json(allAdmins);
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

// Get Admin By Id
const getAdminsById = async (req, res) => {
  try {
    const adminExist = await AdminModel.findById(req.params.id);
    return res.status(200).json(adminExist);
  } catch (error) {
    return res.status(404).json({
      message: `Admin with id: ${req.params.id} not found.`,
      data: undefined,
      error: true,
    });
  }
};

// // Filter Admin By name
// const GetAdminByName = router.get('/name/:firstName', (req, res) => {
//   const adminName = admins.some((admin) => admin.firstName === String(req.params.firstName));
//   if (adminName) {
//     res.json(admins.filter((admin) => admin.firstName === String(req.params.firstName)));
//   } else {
//     res.status(400).json({ msg: `No admins with the name of ${req.params.firstName}` });
//   }
// });

// // Filter Admin By lastName
// const GetAdminByLastName = router.get('/lastName/:lastName', (req, res) => {
//   const found = admins.some((admin) => admin.lastName === req.params.lastName);
//   if (found) {
//     res.json(admins.filter((admin) => admin.lastName === req.params.lastName));
//   } else {
//     res.status(400).json({ msg: `No admins with the lastName of ${req.params.lastName}` });
//   }
// });

// // Filter Admin By Status
// const GetAdminByStatus = router.get('/active/:active', (req, res) => {
//   const listOfActives = admins.filter((admin) =>(admin.active.toString() === req.params.active));
//   if (req.params.active === 'true' || req.params.active === 'false') {
//     res.json(listOfActives);
//   } else {
//     res.status(400).json({ msg: `No admins with the active of ${req.params.active}` });
//   }
// });

module.exports = {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdminsById,
};