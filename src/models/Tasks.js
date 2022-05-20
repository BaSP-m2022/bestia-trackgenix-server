import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: false,
    },
    assignedEmployee: [
      {
        employeeId: {
          type: String,
          required: false,
        },
        employeeRole: {
          type: String,
          required: false,
          enum: ['DEV', 'QA', 'PM', 'TL'],
        },
        employeeName: {
          type: String,
          required: false,
        },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Task', taskSchema);
