import connectDB from "../../../../db/dbConnect"
import jsonwebtoken from 'jsonwebtoken'

async function handler(req, res){
    const { resetPasswordToken } = req.query
    // decode token
    const jwtDecode = jsonwebtoken.decode(resetPasswordToken, {complete: true})
    const userEmail = jwtDecode.payload.email

    // verify token
    const decoded = jsonwebtoken.verify(resetPasswordToken, "emailverificationtoken", (err, decoded) => {
        if(err){
            res.json({
                message: err.message,
                email: userEmail
            })
            return
        }else{
            return decoded
        }
    })

    decoded && res.status(200).json({ message: "reset", email: decoded.email })

}

export default connectDB(handler)