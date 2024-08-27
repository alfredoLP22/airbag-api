import mongoose from "mongoose";
import baseSchema from "./Base.js";

const vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    plate: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 7,
    },
    brand: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        maxlength: 50,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

vehicleSchema.add(baseSchema);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
