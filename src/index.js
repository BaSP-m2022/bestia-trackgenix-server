import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

// mongoose
const URI = process.env.DATABASE_URL;

const app = express();
const port = process.env.PORT;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(URI)
  // eslint-disable-next-line no-console
  .then(() => console.log('Database connected'))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

export default mongoose;
