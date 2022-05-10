// use "import" to import libraries
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// Admins API routes
app.use('/api/superadmins', require('./resources/superadmins'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});