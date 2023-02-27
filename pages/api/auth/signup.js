import connectDB from '../../../db/dbConnect'
import Stripe from 'stripe'
import { hash } from 'bcrypt'
import { User } from '../../../models/auth/User'
import jsonwebtoken from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import verifyEmailFormat from '../templates/emails/verifyEmailTemplate'

async function handler(req, res) {

    if(req.method === 'POST'){
        try {
            const { fullname, email, password } = req.body
            // check if user already exists
            const foundUser = await User.findOne({ email })
            if(foundUser){
                return res.status(401).json({ message: "member exists" })
            }
            // create a new user if user does not exists
            // 1. initialise stripe and create new stripe customer
            const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
            const stripe = new Stripe(stripeKey)
            const stripeCustomer = await stripe.customers.create({
                name: fullname, email   
            })

            // 2. hash password
            const hashedPassword = await hash(password, 12)
            // 3. store new user with fullname, email, hashed password and stripe customer id
            const newUser = new User({
                fullname, email, 
                password: hashedPassword, 
                stripe_customerId: stripeCustomer.id
            })
            await newUser.save()

            // 4. send email with jwt token for verification
            // 4.a create token
            const token = jsonwebtoken.sign({ email }, "emailverificationtoken", {expiresIn: 60 * 60})

            // 4.b send email to new user for verification
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
                from: process.env.SMTP_USER,
                to: email,
                subject: `Verify your Email.`,
                text: "Verify your Email.", // plain text body
                html: verifyEmailFormat(`${baseUrl}/auth/verifyEmail/${token}`, fullname)
            })

            // success i.e. no errors during the signup process
            res.status(200).json({ message: `new user saved` })
        } catch (error) {
            res.status(404).json(error)
        }
    }
}

export default connectDB(handler)

