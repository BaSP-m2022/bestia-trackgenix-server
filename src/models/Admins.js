import { boolean } from 'joi';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: boolean,
      required: true,
    },
  },
);

export default mongoose.model('Admins', adminSchema);
