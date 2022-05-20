import express from 'express';
import timeSheetController from '../controllers/time-sheets';
import timeSheetValidation from '../validations/time-sheets';

const router = express.Router();

router.get('/:id', timeSheetController.getTimeSheetById);
router.post('/', timeSheetValidation.createTimeSheetValidation, timeSheetController.createTimeSheet);
router.put('/:id', timeSheetValidation.updateTimeSheetValidation, timeSheetController.updateTimeSheet);
router.delete('/:id', timeSheetController.deleteTimeSheet);

export default router;
