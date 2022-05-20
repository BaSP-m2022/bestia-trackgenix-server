import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router.post('/', tasksValidations.validateCreation, tasksControllers.createTask);
router.get('/', tasksControllers.getAllTask);
router.get('/:id', tasksControllers.getTaskById);
router.put('/:id', tasksControllers.updateTask, tasksValidations.updateTaskValidation);
router.delete('/:id', tasksControllers.deleteTask);

export default router;
