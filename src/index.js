/* eslint-disable no-console */
// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import timesheetRouter from './controllers/time-sheets';
import employees from './controllers/employees';

// use "require" to import JSON files
const projectsRouter = require('./controllers/projects');
const tasksRouter = require('./controllers/tasks');

const app = express();
const port = process.env.PORT || 3000;

// mongoose
const URI = 'mongodb+srv://BaSP:BaSP2022@basp-database.jeirb.mongodb.net/BaSP-database?retryWrites=true&w=majority';

mongoose.connect(URI)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error(error));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// Employees API routes
app.get('/employees/getById/:id', employees.getEmployeeById);
app.get('/employees/filterByStatus', employees.filterByStatus);
app.get('/employees/filterByLastName', employees.filterByLName);
app.post('/employees/created', employees.createEmployee);
app.delete('/employees/delete/:id', employees.deleteEmployeeId);
app.put('/employees/put/:id', employees.putEmployeeId);

// Admins API routes
app.use('/superadmins', require('./controllers/super-admins'));
app.use('/admins', require('./controllers/admins'));

// Time-sheets API route
app.use('/time-sheets', timesheetRouter);

// Projects API route
app.use('/projects', projectsRouter);

// Tasks API route
app.use('/tasks', tasksRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

export default mongoose;
