import express from 'express';
// Routes import
import taskRouter from './tasks';
import superAdminsRouter from './super-admins';
import adminRoutes from './admins';
import timeSheetsRouter from './time-sheets';
import employeeRoutes from './employees';
import projectRouter from './projects';

const router = express.Router();

router.use('/employees', employeeRoutes);
router.use('/super-admins', superAdminsRouter);
router.use('/tasks', taskRouter);
router.use('/admins', adminRoutes);
router.use('/time-sheets', timeSheetsRouter);
router.use('/projects', projectRouter);

export default router;
