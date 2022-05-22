import express from 'express';
import projectController from '../controllers/projects';
import projectValidation from '../validations/projects';

const router = express.Router();

router.put('/:id', projectValidation.validationUpdate, projectController.updateProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.delete('/:id', projectController.deleteProject);
router.post('/', projectValidation.validationCreateProject, projectController.createProject);

export default router;
