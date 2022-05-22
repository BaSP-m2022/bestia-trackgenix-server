import mongoose from 'mongoose';

// Generate ObjetId on https://observablehq.com/@hugodf/mongodb-objectid-generator
export default [{
  name: 'Avengers Initiative',
  description: 'The mightiest heroes on the planet',
  startDate: '2022-03-21T18:02:23.412+00:00',
  clientName: 'Nick Fury',
  employees: mongoose.Types.ObjectId('62895fe061c9dad4fe922e88'),
}];
