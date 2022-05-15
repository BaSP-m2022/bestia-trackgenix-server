import express from 'express';
import adminsControllers from '../controllers/admins';
// import adminsValidations from '../validations/admins';

const router = express.Router;

router.get('/', adminsControllers.GetAllAdmins);
router.get('/:id', adminsControllers.GetAdminById);
router.get('/name/:firstName', adminsControllers.GetAdminByName);
router.get('/lastName/:lastName', adminsControllers.GetAdminByLastName);
router.get('/active/:active', adminsControllers.GetAdminByStatus);
router.post('/', adminsControllers.CreateAdmin);
router.put('/:id', adminsControllers.UpdateAdmin);
router.delete('/:id', adminsControllers.DeleteAdmin);

export default router;
