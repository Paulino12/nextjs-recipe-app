import connectDB from '../../../../db/dbConnect'
import { User } from '../../../../models/auth/User'
import jsonwebtoken from 'jsonwebtoken'

async function handler(req, res) {
    const { token } = req.query

    // extract email from token in link
    const jwtDecode = jsonwebtoken.decode(token, { complete: true })
    const userEmail = jwtDecode.payload.email

    // find user with extracted email
    const foundUser = await User.findOne({ email: userEmail })

    if(foundUser.email_verified_at !== null){
        // already verified
        return res.json({ message: "user already verified" })
    }else{
            // not verified yet
            const decoded = jsonwebtoken.verify(token, "emailverificationtoken", (err, decoded) => {
            if(err){
                return res.json({ error: err.message, email: userEmail })
            }else{
                return decoded
            }
        })
        try {
            if(decoded){
                const userEmail = decoded.email
                const userPassword = decoded.password
                await User.findOneAndUpdate({ email: userEmail }, { email_verified_at: Date.now() })
                return res.status(200).json({ 
                    message: "verified",
                    email: userEmail,
                    password: userPassword
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default connectDB(handler)