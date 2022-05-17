import express from 'express';
// Routes import
import adminsRoutes from './admins';

const router = express.Router();

router.use('/admins', adminsRoutes);

export default router;
