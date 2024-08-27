import mongoose from "mongoose";

const baseSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

export default baseSchema;