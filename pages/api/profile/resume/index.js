import connectDB from "../../../../db/dbConnect";
import Stripe from "stripe";

async function handler(req, res) {
    // stripe init
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
    const stripe = new Stripe(stripeKey)

    const { stripeSubscriptionId } = req.body

    if(req.method === "PUT"){
        try {
            // update subscription
            stripe.subscriptions.update(stripeSubscriptionId, {cancel_at_period_end: false})
            res.status(200).json(`You successfully resumed your subscription. Thank you!`)
        } catch (error) {
            res.status(400).json({ message: `Could not resume your subscription`})
        }
    }
}

export default connectDB(handler)