import connectDB from "../../../db/dbConnect"
import {User} from "../../../models/auth/User"
import { getSession } from "next-auth/react"
import jsonwebtoken from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import verifyEmailFormat from '../templates/emails/verifyEmailTemplate'
import Stripe from 'stripe'

async function handler(req, res) {

    const session = await getSession({ req })
    // stripe init
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
    const stripe = new Stripe(stripeKey)

    if(!session) {
        res.send({ error: 'not signed in' })
    }else{
        if(req.method === 'GET') {
            // get user's data by default based on userId
            try {
                const foundUser = await User.findById(session.user[0])
                if(!foundUser){
                    res.status(404).json({message: "no user"})
                    return
                }else{
                    res.status(200).json({
                        userId: foundUser._id,
                        name: foundUser.fullname,
                        email: foundUser.email,
                        verified: foundUser.email_verified_at,
                        stripeCustomerId: foundUser.stripe_customerId,
                        stripeSubscriptionPrice: foundUser.stripe_subscription_plan,
                        stripeSubscriptionId: foundUser.stripe_subscriptionId,
                        admin: foundUser.admin
                    })
                }
                
            } catch (error) {
                console.log(error)
            }
        }else if(req.method === 'PUT') {
            const { userId, profileFullname, email, stripeCustomerId } = req.body
            try {
                if(profileFullname){
                    // update name in stripe first and as well
                    await stripe.customers.update(
                        stripeCustomerId, { name: profileFullname }
                    )
                    let newProfile = await User.findByIdAndUpdate(userId, { fullname: profileFullname })
                    res.status(200).json({
                        newProfile, message: "user fullname updated"
                    })
                }else if(email){
                    const token = jsonwebtoken.sign({ email }, "emailverificationtoken", {expiresIn: 60 * 60})
                    // check first if email exists apart from the current one before updating
                    let foundUser = await User.findOne({ email })
                    if(foundUser && foundUser.id !== userId ){
                        // no updates as well as not in stripe
                        res.status(400).json({ message: `A member with this email already exists.`})
                    }else{
                        // update email in mongodb
                        let newProfile = await User.findByIdAndUpdate(userId, { email: email, email_verified_at: null })
                        // then update email in stripe as well
                        await stripe.customers.update(
                            stripeCustomerId, { email }
                        )
                        try {
                            // send email to new user for verification
                            // create reusable transporter object using the default SMTP transport
                            let transport = nodemailer.createTransport({
                                host: process.env.SMTP_HOST,
                                port: process.env.SMTP_PORT,
                                secure: process.env.SMTP_SECURE, // true for 465, false for other ports
                                auth: {
                                    user: process.env.SMTP_USER, 
                                    pass: process.env.SMTP_PASS,
                                },
                            });
                            // send mail with defined transport object
                            const baseUrl = process.env.NEXTAUTH_URL
                            await transport.sendMail({
                                from: "contact@maryoctav.com",
                                to: email,
                                subject: `Sign in to Cintel`,
                                text: "Verify Email", // plain text body
                                // html: `<a href='${baseUrl}/verifyEmail/${token}' target='_blank'>Verify Email</a>` , // html body
                                html: verifyEmailFormat(`${baseUrl}/auth/verifyEmail/${token}`, newProfile.fullname)
                            })
                        } catch (error) {
                            console.log(error)
                        }
                        res.status(200).json({
                            newProfile, message: "You successfully updated your email"
                        })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default connectDB(handler)