const express = require('express');

const fs = require('fs');

const router = express.Router();
const superadmins = require('../data/super-admins.json');

// Create super-admin
router.post('/', (req, res) => {
  const rb = req.body;
  if (!rb.id || !rb.firstName || !rb.lastName || !rb.email || !rb.password || !rb.active) {
    res.status(400).json({ msg: 'Please include the solicited information' });
  }
  superadmins.push(req.body);
  const newSuperAdmin = superadmins;
  fs.writeFile('src/data/super-admins.json', JSON.stringify(newSuperAdmin), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        msg: 'Superadmin created', superadmins: newSuperAdmin,
      });
    }
  });
});

// Update super-admin
router.put('/:id', (req, res) => {
  const found = superadmins.some((superadmin) => superadmin.id === Number(req.params.id));
  if (found) {
    const otherSuperAdmin = superadmins.filter((superadmin) => superadmin.id
     !== Number(req.params.id));
    const superAdminCopy = superadmins.find((superadmin) => superadmin.id
     === Number(req.params.id));
    const {
      firstName, lastName, email, password, active,
    } = req.body;
    const updSuperAdmin = {
      id: Number(req.params.id),
      firstName: (firstName || superAdminCopy.firstName),
      lastName: (lastName || superAdminCopy.lastName),
      email: (email || superAdminCopy.email),
      password: (password || superAdminCopy.password),
      active: Boolean(active ?? superAdminCopy.active),
    };
    otherSuperAdmin.push(updSuperAdmin);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(otherSuperAdmin), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ msg: 'Superadmin updated', superadmins: otherSuperAdmin });
      }
    });
  } else {
    res.status(400).json({ msg: `No Superadmins with the id of ${req.params.id}` });
  }
});

// Delete super-admin
router.delete('/id=:id', (req, res) => {
  const found = superadmins.some((superadmin) => superadmin.id === Number(req.params.id));
  const dltSuperAdmin = superadmins.filter((superadmin) => superadmin.id !== Number(req.params.id));
  if (found) {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(dltSuperAdmin), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          msg: 'Superadmin deleted', superadmins: dltSuperAdmin,
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No superadmins with the id of ${req.params.id}` });
  }
});

// Get all super-admins
router.get('/', (req, res) => res.status(200).json(superadmins));

// Get single super-admin:
// By Id
router.get('/id/:id', (req, res) => {
  const found = superadmins.some((superadmin) => superadmin.id === Number(req.params.id));
  if (found) {
    res.json(superadmins.filter((superadmin) => superadmin.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No superadmins with the id of ${req.params.id}` });
  }
});

// By name
router.get('/name/:firstName', (req, res) => {
  const superAdminName = superadmins.some((superadmin) => superadmin.firstName
   === String(req.params.firstName));
  if (superAdminName) {
    res.json(superadmins.filter((superadmin) => superadmin.firstName
     === String(req.params.firstName)));
  } else {
    res.status(400).json({ msg: `No superadmins with the name of ${req.params.firstName}` });
  }
});

// By lastName
router.get('/lastName=:lastName', (req, res) => {
  const found = superadmins.some((superadmin) => superadmin.lastName === req.params.lastName);
  if (found) {
    res.json(superadmins.filter((superadmin) => superadmin.lastName === req.params.lastName));
  } else {
    res.status(400).json({ msg: `No superadmins with the lastName of ${req.params.lastName}` });
  }
});

// By active status
router.get('/active=:active', (req, res) => {
  const listOfActivesSuperA = superadmins.filter((superadmin) => (superadmin.active.toString()
  === req.params.active));
  if (req.params.active === 'true' || req.params.active === 'false') {
    res.json(listOfActivesSuperA);
  } else {
    res.status(400).json({ msg: `No admins with the active of ${req.params.active}` });
  }
});

module.exports = router;
