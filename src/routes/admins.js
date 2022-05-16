import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router;

router.get('/admins/', adminControllers.getAllAdmins);
router.get('/admins/:id', adminControllers.getAdminById);
// router.get('/name/:firstName', adminsControllers.);
// router.get('/lastName/:lastName', adminsControllers.);
// router.get('/active/:active', adminsControllers.);
router.post('/admins/', adminValidations.validateCreation, adminControllers.createSuperAdmin);
router.post('/admins/', adminControllers.createAdmin);
router.put('/admins/', adminValidations.validateCreation, adminControllers.createSuperAdmin);
router.put('/admins/:id', adminControllers.updateAdmin);
router.delete('/admins/:id', adminControllers.deleteAdmin);

export default router;
