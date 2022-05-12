// use "import" to import libraries
import express from 'express';
import timesheetRouter from './resources/time-sheets';
import employees from './resources/employees';

// use "require" to import JSON files
const projectsRouter = require('./resources/projects');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/projects', projectsRouter);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.post('/employees/created', employees.createEmployee);
app.delete('/employees/delete/:id', employees.deleteEmployeeId);
app.put('/employees/put/:id', employees.putEmployeeId);

// Admins API routes
app.use('/api/superadmins', require('./resources/super-admins'));
app.use('/api/admins', require('./resources/admins'));

app.get('/employees/getById/:id', employees.getEmployeeById);
app.get('/employees/filterByStatus', employees.filterByStatus);
app.get('/employees/filterByLastName', employees.filterByLName);

app.use('/time-sheets', timesheetRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
