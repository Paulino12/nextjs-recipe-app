import connectDB from "../../../../db/dbConnect";
import { User } from "../../../../models/auth/User";
import Stripe from "stripe";
import { newDateFormat, nonStripeDateFormat } from '../../../../utils/dateFormat'

async function handler(req, res) {
    // stripe init
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
    const stripe = new Stripe(stripeKey)

    const { stripeSubscriptionId, userId } = req.body
    console.log(stripeSubscriptionId, userId)

    if(req.method === "PUT"){
        try {
            // retrieve and update subscription
            // retrieve
            const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
            // then update subscription
            stripe.subscriptions.update(stripeSubscriptionId, {
                cancel_at_period_end: true,
            })

            // compare dates
            const currentPeriodEnd = new Date(subscription.current_period_end * 1000).valueOf()
            const currentDate = new Date().valueOf()
            if(currentPeriodEnd < currentDate){
                // update User in MongoDb by setting subs plan & subs id to null
                const updatedUser = await User.findByIdAndUpdate(userId, { stripe_subscription_plan: null })
                return updatedUser
            }
            return res.status(200).json(`Your subscription will end on ${newDateFormat(subscription.current_period_end)[3]}`)
        } catch (error) {
            return res.status(400).json({ message: `Could not cancel your subscription` })
        }
    }
}

export default connectDB(handler)