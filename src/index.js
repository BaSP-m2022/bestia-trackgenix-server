import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const URI = 'mongodb+srv://BaSP:BaSP2022@basp-database.jeirb.mongodb.net/BaSP-database?retryWrites=true&w=majority';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect(URI)
  // eslint-disable-next-line no-console
  .then(() => console.log('Database connected'))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));

export default mongoose;
