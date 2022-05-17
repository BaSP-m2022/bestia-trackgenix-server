import express from 'express';
// Routes import
import adminRoutes from './admins';

const router = express.Router();

router.use('/admins', adminRoutes);

export default router;
