const express = require('express');
const fs = require('fs');
const tasks = require('../data/tasks.json');

const router = express.Router();

// Obtain Tasks
router.get('/getAll', (req, res) => {
  res.send(tasks);
});

module.exports = router;
