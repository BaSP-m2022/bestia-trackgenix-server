import mongoose from 'mongoose';

// Generate ObjetId on https://observablehq.com/@hugodf/mongodb-objectid-generator
export default [{
  id: mongoose.Types.ObjectId('628424c0f931e340851841ff'),
  name: 'Avengers Initiative',
  description: 'The mightiest heroes on the planet',
  startDate: '2022-03-21T18:02:23.412+00:00',
  endDate: '2022-05-21T18:02:23.412+00:00',
  clientName: 'Nick Fury',
  state: 'Active',
  employees: [
    {
      role: 'DEV',
      rate: '10',
      id: '62842ad08deb423ec414a097',
    },
  ],
}];
