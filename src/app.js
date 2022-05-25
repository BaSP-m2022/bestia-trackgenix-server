import express from 'express';
import router from './routes';

import admins from './controllers/admins';
import adminsValidations from './validations/admins';

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(router);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', admins.getAdminById);
app.get('/admins', admins.getAllAdmins);
app.post('/admins', adminsValidations.validateCreate, admins.createAdmin);
app.delete('/admins', admins.deleteAdmin);
app.put('/admins', adminsValidations.validateUpdate, admins.updateAdmin);

export default app;
