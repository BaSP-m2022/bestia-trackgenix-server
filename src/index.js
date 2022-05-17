/* eslint-disable no-console */
// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

// mongoose
const URI = 'mongodb+srv://BaSP:BaSP2022@basp-database.jeirb.mongodb.net/BaSP-database?retryWrites=true&w=majority';

mongoose.connect(URI)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error(error));

// Routes
app.use(router);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

export default mongoose;
