/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const express = require('express');
const res = require('express/lib/response');

const fs = require('fs');

const router = express.Router();
const admins = require('../data/admins.json');

// Create admin
const CreateAdmin = router.post('/', (req, res) => {
  const rb = req.body;
  if (!rb.id || !rb.firstName || !rb.lastName || !rb.email || !rb.password || !rb.active) {
    res.status(400).json({ msg: 'Please include the solicited information' });
  }
  admins.push(req.body);
  const newAdmin = admins;
  fs.writeFile('src/data/admins.json', JSON.stringify(newAdmin), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        msg: 'Admin created', admins: newAdmin,
      });
    }
  });
});

// Update admin
const UpdateAdmin = router.put('/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  if (found) {
    const otherAdmin = admins.filter((admin) => admin.id !== Number(req.params.id));
    const adminCopy = admins.find((admin) => admin.id === Number(req.params.id));
    const {
      firstName, lastName, email, password, active,
    } = req.body;
    const updAdmin = {
      id: Number(req.params.id),
      firstName: (firstName || adminCopy.firstName),
      lastName: (lastName || adminCopy.lastName),
      email: (email || adminCopy.email),
      password: (password || adminCopy.password),
      active: Boolean(active ?? adminCopy.active),
    };
    otherAdmin.push(updAdmin);
    fs.writeFile('src/data/admins.json', JSON.stringify(otherAdmin), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ msg: 'Admin updated', admins: otherAdmin });
      }
    });
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

// Delete admin
const DeleteAdmin = router.delete('/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  const dltAdmin = admins.find((admin) => admin.id !== Number(req.params.id));
  if (found) {
    fs.writeFile('src/data/admins.json', JSON.stringify(dltAdmin), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          msg: 'Admin deleted', admins: dltAdmin,
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

// Get all admins
const GetAllAdmins = router.get('/', (req, res) => res.status(200).json(admins));

// Get Admin By Id
const GetAdminById = router.get('/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  if (found) {
    res.json(admins.find((admin) => admin.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

// Filter Admin By name
const GetAdminByName = router.get('/name/:firstName', (req, res) => {
  const adminName = admins.some((admin) => admin.firstName === String(req.params.firstName));
  if (adminName) {
    res.json(admins.filter((admin) => admin.firstName === String(req.params.firstName)));
  } else {
    res.status(400).json({ msg: `No admins with the name of ${req.params.firstName}` });
  }
});

// Filter Admin By lastName
const GetAdminByLastName = router.get('/lastName/:lastName', (req, res) => {
  const found = admins.some((admin) => admin.lastName === req.params.lastName);
  if (found) {
    res.json(admins.filter((admin) => admin.lastName === req.params.lastName));
  } else {
    res.status(400).json({ msg: `No admins with the lastName of ${req.params.lastName}` });
  }
});

// Filter Admin By Status
const GetAdminByStatus = router.get('/active/:active', (req, res) => {
  const listOfActives = admins.filter((admin) => (admin.active.toString() === req.params.active));
  if (req.params.active === 'true' || req.params.active === 'false') {
    res.json(listOfActives);
  } else {
    res.status(400).json({ msg: `No admins with the active of ${req.params.active}` });
  }
});

module.exports = {
  CreateAdmin,
  UpdateAdmin,
  DeleteAdmin,
  GetAllAdmins,
  GetAdminById,
  GetAdminByName,
  GetAdminByLastName,
  GetAdminByStatus,
};
