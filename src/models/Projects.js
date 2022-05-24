import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
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
      required: true,
    },
    employees: [{
      _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'employee' },
      role: { type: String, required: true, enum: ['DEV', 'PM', 'QA', 'TL'] },
      rate: { type: String, required: true },
    }],
  },
);

export default mongoose.model('Projects', projectSchema);
