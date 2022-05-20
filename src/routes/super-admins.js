import express from 'express';
import superAdminControllers from '../controllers/super-admins';
import superAdminValidation from '../validations/super-admins';

const router = express.Router();

router.post('/', superAdminValidation.validateCreation, superAdminControllers.createSuperAdmin);
router.delete('/:id', superAdminControllers.deleteSuperAdmin);
router.get('/', superAdminControllers.getAllSuperAdmins);
router.get('/:id', superAdminControllers.getSuperAdminsById);
router.put('/:id', superAdminControllers.updateSuperAdmin);

export default router;
