import jsonwebtoken from 'jsonwebtoken'
import { hash } from 'bcrypt'
import { User } from '../../../models/auth/User'
import nodemailer from 'nodemailer'
import verifyEmailFormat from '../templates/emails/verifyEmailTemplate'

async function handler(req, res) {
    // create token from email
    const { email } = req.body
    const baseUrl = process.env.NEXTAUTH_URL
    if(req.method === 'POST'){
        // check first if email exists
        const foundUser = await User.findOne({ email })
        if(!foundUser){
            res.status(200).json(`Unable to find this email, please provide a registered email.`)
        }else{
            const token = jsonwebtoken.sign({ email }, "emailverificationtoken", {expiresIn: 10 * 60})
            try {
                // send email to new user for verification
                // create reusable transporter object using the default SMTP transport
                let transport = nodemailer.createTransport({
                    host: "smtp.stackmail.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: "contact@maryoctav.com", 
                        pass: "Magniaga12,",
                    },
                });
                // send mail with defined transport object
                await transport.sendMail({
                    from: "contact@maryoctav.com",
                    to: email,
                    subject: `Reset Password`,
                    text: "Verify Email", // plain text body
                    // html: `<a href='${baseUrl}/resetPassword/${token}' target='_blank'>Verify</a>` , // html body
                    html: verifyEmailFormat(`${baseUrl}/auth/resetPassword/${token}`, '')
                })
            } catch (error) {
                console.log(error)
            }
            res.status(200).json(`Please check your email to reset your password, you have 10 minutes.`)
        }
    }else if(req.method === 'PUT'){
        try {
            const { email, newPassword } = req.body
            const hashednewPassword = await hash(newPassword, 12)
            await User.findOneAndUpdate({ email }, { password: hashednewPassword})
            res.status(200).json({ message: "successful reset, please wait..." })
        } catch (error) {
            console.log(error)
        }
        
    }

}

export default handler
