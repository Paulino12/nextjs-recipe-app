import connectDB from '../../../db/dbConnect'
import { User } from '../../../models/auth/User'
import jsonwebtoken from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import verifyEmailFormat from '../templates/emails/verifyEmailTemplate'

async function handler(req, res) {

    if(req.method === 'POST'){
        const { email } = req.body
        // sing token
        const token = jsonwebtoken.sign({ email }, "emailverificationtoken", {expiresIn: 60 * 60})
        // getting user fullname for email purpose
        const foundUser = await User.findOne({ email })

        // send email with token
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
                from: process.env.SMTP_USER,
                to: email,
                subject: `Verify your Email.`,
                text: "Verify Email", // plain text body
                html: verifyEmailFormat(`${baseUrl}/auth/verifyEmail/${token}`, foundUser.fullname)
            })
            res.status(200).json({ message: "new email sent"})
        } catch (error) {
            console.log(error)
        }
        
    }
}

export default connectDB(handler)