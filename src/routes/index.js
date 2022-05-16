import express from 'express';
import adminsRoutes from './admins';

const router = express.Router;

router.set('/admins', adminsRoutes);

export default router;
