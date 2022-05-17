import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  clientName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: false,
  },
  employees: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Projects', projectSchema);
