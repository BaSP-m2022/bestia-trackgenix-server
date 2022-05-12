// use "import" to import libraries
import express from 'express';

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

// Admins API routes
app.use('/api/admins', require('./resources/admins'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
