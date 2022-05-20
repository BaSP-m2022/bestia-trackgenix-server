import express from 'express';
import timeSheetsRouter from './time-sheets';
import projectRouter from './projects';

const router = express.Router();

router.use('/time-sheets', timeSheetsRouter);
router.use('/projects', projectRouter);

export default router;
