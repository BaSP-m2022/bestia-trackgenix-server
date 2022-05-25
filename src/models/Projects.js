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
      required: false,
    },
    employees: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'employee',

    },
  },
  { timestamps: true },
);

export default mongoose.model('Projects', projectSchema);
