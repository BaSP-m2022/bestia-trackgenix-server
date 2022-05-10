/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const express = require('express');
const res = require('express/lib/response');

const router = express.Router();
const admins = require('../data/admins.json');

// Create admin
router.post('/', (req, res) => {
  const rb = req.body;
  if (!rb.id || !rb.firstName || !rb.lastName || !rb.email || !rb.password || !rb.active) {
    res.status(400).json({ msg: 'Please include the solicited information' });
  }
  admins.push(req.body);
  res.json(admins);
});

// Update admin
router.put('/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  if (found) {
    const updAdmin = req.body;
    admins.forEach((admin) => {
      if (admin.id === Number(req.params.id)) {
        admin.firstName = updAdmin.firstName ? updAdmin.firstName : admin.firstName;
        admin.lastName = updAdmin.lastName ? updAdmin.lastName : admin.lastName;
        admin.email = updAdmin.email ? updAdmin.email : admin.email;
        admin.password = updAdmin.password ? updAdmin.password : admin.password;
        admin.active = updAdmin.active ? updAdmin.active : admin.active;

        res.json({ msg: 'Admin updated', admin });
      }
    });
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

// Get all admins
router.get('/', (req, res) => res.status(200).json(admins));

// Get single admin:
// By Id
router.get('/id/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  if (found) {
    res.json(admins.filter((admin) => admin.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

// By name
router.get('/name/:firstName', (req, res) => {
  const adminName = admins.some((admin) => admin.firstName === String(req.params.firstName));
  if (adminName) {
    res.json(admins.filter((admin) => admin.firstName === String(req.params.firstName)));
  } else {
    res.status(400).json({ msg: `No admins with the name of ${req.params.firstName}` });
  }
});

// By lastName
router.get('/lastName=:lastName', (req, res) => {
  const found = admins.some((admin) => admin.lastName === req.params.lastName);
  if (found) {
    res.json(admins.filter((admin) => admin.lastName === req.params.lastName));
  } else {
    res.status(400).json({ msg: `No admins with the lastName of ${req.params.lastName}` });
  }
});

// By active status
router.get('/active=:active', (req, res) => {
  const listOfActives = admins.filter((admin) => (admin.active.toString() === req.params.active));
  if (req.params.active === 'true' || req.params.active === 'false') {
    res.json(listOfActives);
  } else {
    res.status(400).json({ msg: `No admins with the active of ${req.params.active}` });
  }
});

// Delete admin
router.delete('/id=:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  if (found) {
    res.json({
      msg: 'Admin deleted', admins: admins.filter((admin) => admin.id !== Number(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

module.exports = router;
