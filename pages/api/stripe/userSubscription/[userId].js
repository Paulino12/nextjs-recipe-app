import connectDB from "../../../../db/dbConnect"
import { User } from "../../../../models/auth/User"
import Stripe from 'stripe'

async function handler(req, res) {

    // stripe init
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
    const stripe = new Stripe(stripeKey)

    const { userId } = req.query
    const { productPrice } = req.body

    // get user info
    const foundUser = await User.findById(userId)

    if(req.method === "GET"){
        if(!foundUser.stripe_subscription_plan){// no subscription plan i.e price
            // below response will redirect to purchase subscription on front end
            return res.status(200).json({
                customerId: foundUser.stripe_customerId,
                userSubscription: foundUser.stripe_subscription_plan,
                userAdmin: foundUser.admin
            })
        }
        // below in case there is a subscriptionId in the database
        // retrieve current subscription
        const subscription = await stripe.subscriptions.retrieve(foundUser.stripe_subscriptionId)
        // check cancel at end period i.e. has the user cancelled subscription?
        if(subscription.cancel_at_period_end) // user cancelled subscription
        {
            // compare current date with end of current subscription period
            const periodEnd = new Date(subscription.current_period_end * 1000).valueOf()
            const currentDate = new Date().valueOf()
            if(periodEnd < currentDate){
                // update user data in database
                await User.findByIdAndUpdate(userId, { 
                    stripe_subscription_plan: null
                 })
                 return res.status(200).json("Your subscription has ended.") // not sent to front end yet
                //  ideally through notification in the future
            }
        }    
        res.status(200).json({
            customerId: foundUser.stripe_customerId,
            userSubscription: foundUser.stripe_subscription_plan,
            userAdmin: foundUser.admin
        })
    } else if (req.method === "PUT"){
        try {
            // getting subscription id from stripe
            const subscription = await stripe.subscriptions.list({customer: foundUser.stripe_customerId})
            // update user subscription plan with subscription price & id
            await User.findByIdAndUpdate(userId, { 
                stripe_subscription_plan: productPrice, stripe_subscriptionId: subscription.data[0].id
             })
            res.status(200).json(`subscription plan updated`)
        } catch (error) {
            res.status(400).json({ message: `Unable to update subscription plan` })
        }
    }
}

export default connectDB(handler)