/* let timesheet = new Schema({
    _id: new Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastName: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    avatar: {
        type: Buffer
    },
    isAccountVerified: {
        type: Boolean
    },
    socialProfiles: [{
            twitter: String
        },
        {
            facebook: String
        },
        {
            linkedin: String
        },
        {
            instagram: String
        }
    ],
    accountCreated: {
        type: Date,
        default: Date.now
    }
}, {
    // Define MongoDB Collection
    collection: 'users'
}) */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema(
    {
        id: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        day: {
            type: Date,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["QA", "PM", "DEV", "TL"]
        },
        project: {
            type: String,
            required: true
        },
        task: {
            type: String,
            required: true
        },
        validated: {
            type: Boolean,
            required: true,
            enum: [true, false]
        },
        projectId: {
            type: Number,
            required: true
        },
        projectManager: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Time Sheet', timeSheetSchema);