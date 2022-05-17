import express from 'express';
import timeSheetsRouter from './time-sheets';

const router = express.Router();

router.use('/timeSheets', timeSheetsRouter);

export default router;
