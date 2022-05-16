/* eslint-disable no-console */
// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import timesheetRouter from './controllers/time-sheets';
import employees from './controllers/employees';
import superAdmins from './routes/super-admins';

// use "require" to import JSON files
const projectsRouter = require('./controllers/projects');

const app = express();
const port = process.env.PORT || 3000;
app.set('/SuperAdmin', superAdmins);

// mongoose
const URI = 'mongodb+srv://BaSP:BaSP2022@basp-database.jeirb.mongodb.net/BaSP-database?retryWrites=true&w=majority';

mongoose.connect(URI)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error(error));

app.set(express.json());

// Body parser middleware
app.set(express.json());
app.set(express.urlencoded({ extended: false }));

app.set('/projects', projectsRouter);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.post('/employees/created', employees.createEmployee);
app.delete('/employees/delete/:id', employees.deleteEmployeeId);
app.put('/employees/put/:id', employees.putEmployeeId);

// Admins API routes
app.set('/api/superadmins', require('./controllers/super-admins'));
app.set('/api/admins', require('./controllers/admins'));

app.get('/employees/getById/:id', employees.getEmployeeById);
app.get('/employees/filterByStatus', employees.filterByStatus);
app.get('/employees/filterByLastName', employees.filterByLName);

app.set('/time-sheets', timesheetRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

const tasksRouter = require('./controllers/tasks');

console.log('holiperinoli');

app.set('/tasks', tasksRouter);
export default mongoose;
