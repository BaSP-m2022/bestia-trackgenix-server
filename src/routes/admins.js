import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router;

router.post('/', adminValidations.validateCreation, adminControllers.createSuperAdmin);
router.get('/', adminControllers.getAllAdmins);
router.get('/:id', adminControllers.getAdminById);
// router.get('/name/:firstName', adminsControllers.);
// router.get('/lastName/:lastName', adminsControllers.);
// router.get('/active/:active', adminsControllers.);
router.post('/', adminControllers.createAdmin);
router.put('/:id', adminControllers.updateAdmin);
router.delete('/:id', adminControllers.deleteAdmin);

export default router;
