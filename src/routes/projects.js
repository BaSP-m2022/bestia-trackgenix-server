import express from 'express';
import projectController from '../controllers/projects';
import projectValidation from '../validations/projects';

const router = express.Router();

router.post('/', projectValidation.validationCreateProject, projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectValidation.validationUpdate, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export default router;
