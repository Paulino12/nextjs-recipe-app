// In this user model we create a user schema
import mongoose from "mongoose"
const { Schema } = mongoose

const contactSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String,  required: true },
    subject: { type: String,  required: true },
    message: { type: String,  required: true },
}, { timestamps: true })

mongoose.models = {}

export const Contact = mongoose.model('Contact', contactSchema)