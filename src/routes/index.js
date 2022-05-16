import express from 'express';
import superAdminsRouter from './super-admins';

const router = express.Router();

router.use('/Super-admins', superAdminsRouter);

export default router;
