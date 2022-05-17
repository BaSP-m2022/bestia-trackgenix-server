import express from 'express';
import projectController from '../controllers/projects';
import projectValidation from '../validations/projects';

const router = express.Router();

router.put('/:id', projectValidation.validationUpdate, projectController.put);
// router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.delete('/:id', projectController.deleteById);
router.post('/', projectValidation.validationCreateProject, projectController.create);

export default router;
