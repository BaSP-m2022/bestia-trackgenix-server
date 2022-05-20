import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

// mongoose
const URI = 'mongodb+srv://BaSP:BaSP2022@basp-database.jeirb.mongodb.net/BaSP-database?retryWrites=true&w=majority';

const app = express();
const port = process.env.PORT || 3000;

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
