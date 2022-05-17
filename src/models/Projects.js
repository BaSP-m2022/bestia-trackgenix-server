import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
});

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
  employees: [employeeSchema],
});

export default mongoose.model('Projects', projectSchema);
