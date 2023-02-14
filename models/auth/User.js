// In this user model we create a user schema
import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String,  required: true, unique: true },
    password: { type: String,  required: true },
    email_verified_at: { type: Date, default: null },
    stripe_customerId: { type: String, default: null },
    stripe_subscription_plan: { type: String, default: null },
    stripe_subscriptionId: { type: String, default: null },
    admin: { type: Boolean, default: false }
}, { timestamps: true })

mongoose.models = {}

export const User = mongoose.model('User', userSchema)