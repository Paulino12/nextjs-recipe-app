import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "../../../models/auth/User"
import { compare } from "bcrypt"

export default NextAuth({
    // specifying provider
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Email", type: "email", placeholder: "email" },
            password: {  label: "Password", type: "password" }
          },
          
          async authorize(credentials, req) {

            // check if user's email exists
            const foundUser = await User.findOne({
              email: credentials.username
            })

            if(!foundUser){
              throw new Error("Invalid Credentials - Try Again")
            }

            // check hashed password by comparing
            const checkedPassword = await compare(credentials.password, foundUser.password)
            if(!checkedPassword){
              throw new Error("Invalid Credentials - Try Again")
            }

            // check now for email verification
            if(foundUser.email_verified_at === null){
              throw new Error("You are not yet verified - Please check your email")
            }

            // check now if suscription plan is null
            if(foundUser.subscription_plan === null){
              return foundUser
            }

            //Else send success response
            return foundUser
          }
        })
      ],
      pages: {
        signIn: '/auth/signin',
        error: '/auth/signin', // Error code passed in query string as ?error=
      },
      jwt: {
        // A secret to use for key generation. Defaults to the top-level `secret`.
        secret: process.env.NEXTAUTH_SECRET,
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60, // 1 hour
      },
      session: {
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 60 * 60, // 1 hour 
      },
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async jwt({ token, user }) {
          if(user){
            token.sub = [user.id, user.stripe_subscription_plan, user.stripe_customerId, user.admin]
          }
          return token
        },
        async session({ session, token }) {
          session.user = token.sub
          return session
        },
      }
})