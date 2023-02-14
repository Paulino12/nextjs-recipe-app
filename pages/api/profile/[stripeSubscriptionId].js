import connectDB from "../../../db/dbConnect";
import Stripe from 'stripe'

async function handler(req, res) {
     // stripe init
     const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
     const stripe = new Stripe(stripeKey)

     const { stripeSubscriptionId } = req.query

     try {
        const subscription = await stripe.subscriptions.retrieve(
          stripeSubscriptionId
        )

        // getting plan name through product object
        const product = await stripe.products.retrieve(subscription.plan.product)

        // get all invoices
        const invoices = await stripe.invoices.list(
          {customer: subscription.customer}
        )   

        if(subscription.cancel_at_period_end){
          // case subscription.cancel_at_period_end is TRUE
          res.status(200).json({
            invoices: invoices.data,
            active: subscription.plan.active,
            status: subscription.status,
            dateCreated: subscription.created,
            trialEnd: subscription.trial_end,
            currentPeriodStart: subscription.current_period_start,
            currentPeriodEnd: subscription.current_period_end, 
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            planName: product.description
          })
        }else{
          // case subscription.cancel_at_period_end is FALSE
          // upcoming invoice
          const upcomingInvoice = await stripe.invoices.retrieveUpcoming(
            {customer: subscription.customer}
          )
          res.status(200).json({
            subscription,
            invoices: invoices.data,
            upcomingInvoice: {
              amountDue: upcomingInvoice.amount_due,
              startPeriod: upcomingInvoice.created
            },
            active: subscription.plan.active,
            status: subscription.status,
            dateCreated: subscription.created,
            trialEnd: subscription.trial_end,
            currentPeriodStart: subscription.current_period_start,
            currentPeriodEnd: subscription.current_period_end, 
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            planName: product.description
          })
        } 
     } catch (error) {
       res.status(400).json({ message: `Unable to get subscription data` })
     }
}

export default connectDB(handler)