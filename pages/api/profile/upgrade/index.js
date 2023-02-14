import connectDB from "../../../../db/dbConnect";
import { User } from "../../../../models/auth/User";
import Stripe from "stripe";

async function handler(req, res) {
    // stripe init
    const stripeKey = process.env.NEXT_PUBLIC_NEXT_PUBLIC_STRIPE_SECRET_KEY
    const stripe = new Stripe(stripeKey)
   
    const { stripeSubscriptionId, premiumPrice, userId} = req.body

    try {
        // retrieve and update subscription
        // retrieve
        const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
        // then update
        const updatedSubscription = stripe.subscriptions.update(stripeSubscriptionId, {
            cancel_at_period_end: false,
            proration_behavior: 'create_prorations',
            items: [{
                id: subscription.items.data[0].id,
                price: premiumPrice
            }]
        })
        if(updatedSubscription){// case updated
            // update database with new price
            await User.findByIdAndUpdate(userId, { 
                stripe_subscription_plan: premiumPrice
            })
            res.status(200).json(`You successfully upgraded to CINTEL App Premium. Thank you!`)
        }else{
            res.status(400).json({ message: `Could not upgrade` })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: `Could not process the upgrade` })
    }
    
}

export default connectDB(handler)