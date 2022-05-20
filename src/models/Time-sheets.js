import mongoose from 'mongoose';

const { Schema } = mongoose;

const TimeSheetModel = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    day: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['QA', 'PM', 'DEV', 'TL'],
    },
    project: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    validated: {
      type: Boolean,
      required: true,
      enum: [true, false],
    },
    projectManager: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Time-sheet', TimeSheetModel);
