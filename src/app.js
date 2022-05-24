import express from 'express';
import router from './routes';

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(router);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

export default app;
