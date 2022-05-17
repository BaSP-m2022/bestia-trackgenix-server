import express from 'express';
import tasksValidations from '../validations/tasks';
import tasksControllers from '../controllers/tasks';

const router = express.Router();

router.post('/', tasksValidations.validateCreation, tasksControllers.createTask);
router.delete('/:id', tasksControllers.deleteTask);

export default router;