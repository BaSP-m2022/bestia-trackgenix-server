import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validations/employees';

const router = express.Router();

// localhost:4000/employee/
router.get('/', employeeController.getAllEmployees);
router.post('/create', employeeValidation.validateEmployee, employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeValidation.validateMod, employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

export default router;
