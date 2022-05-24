import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validations/employees';

const router = express.Router();

// localhost:4000/employee/
router.get('/', employeeController.getAllEmployees);
router.post('/', employeeValidation.createEmployeeValidation, employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeValidation.updateEmployeeValidation, employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

export default router;
