import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profile:{
        type: String,
        default: ''
    },
    verified: {
        type: Boolean,
        require: true,
        default: false
    },
    token: {
        type: Number,
        trim: true,
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.models.User || mongoose.model('User', UserSchema)