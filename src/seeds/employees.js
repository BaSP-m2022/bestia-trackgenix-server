import mongoose from 'mongoose';

// Generate ObjetId on https://observablehq.com/@hugodf/mongodb-objectid-generator
export default [
  {
    _id: mongoose.Types.ObjectId('6283baefcd44998f831522ab'),
    first_name: 'Francisco',
    last_name: 'Bergoglio',
    phone: '3413931320',
    email: 'papafrancisco@radiumrocket.com',
    active: true,
  },
  {
    _id: mongoose.Types.ObjectId('62842cca8deb423ec414a09f'),
    firstName: 'Pedro',
    lastName: 'Lopez',
    phone: '3415062351',
    email: 'plopez@gmail.com',
    active: true,
  },
];