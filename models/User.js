import mongoose from "mongoose";
import baseSchema from "./Base.js";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 6,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 6,
    },
    token: {
        type: String,
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.add(baseSchema);
const User = mongoose.model("User",userSchema);
export default User;