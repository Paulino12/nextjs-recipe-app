import connectDB from '../../../db/dbConnect'
import { Contact } from '../../../models/Contact'
import nodemailer from 'nodemailer'
import contactUs from '../templates/emails/contactUs'

async function handler(req, res) {

    const { fullname, email, subject, contactMessage } = req.body

    if(req.method === "POST"){
        try {
            const newContact = new Contact({ fullname, email, subject, message: contactMessage })
            await newContact.save()
            // send email
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
            // const mailList = [email, 'paulino@maryoctav.com']
            await transport.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: `${fullname}, You contacted MaryOctav Ltd`,
                text: "You contacted MaryOctav Ltd", // plain text body
                html: contactUs(fullname)
            })
            // mailList.forEach(async (mail) => {
            //     await transport.sendMail({
            //         from: process.env.SMTP_USER,
            //         to: mail,
            //         subject: `${fullname}, You contacted MaryOctav Ltd`,
            //         text: "You contacted MaryOctav Ltd", // plain text body
            //         html: contactUs(fullname)
            //     })
            // });
            // send mail with defined transport object
            
            res.status(200).json(`Many thanks for your request, we will be in touch soon...`)
        } catch (error) {
            res.status(400).json({ message: 'Unable to recieve your request'})
        }
    }

}

export default connectDB(handler)