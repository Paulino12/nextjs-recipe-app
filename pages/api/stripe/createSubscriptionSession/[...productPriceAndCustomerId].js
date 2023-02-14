import Stripe from 'stripe'
import { User } from '../../../../models/auth/User'

async function handler(req, res) {

  const baseUrl = process.env.NEXTAUTH_URL

  if(req.method === "GET"){
    const { productPriceAndCustomerId } = req.query
    const foundUser = await User.findOne({ stripe_customerId: productPriceAndCustomerId[1] })
    // initiate stripe
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
    const stripe = new Stripe(stripeKey)

    ////// BEFORE CREATING A SESSION CHECK /////
    
    // iS THE USER BRAND NEW? /// 
    /** no status */
    /** i.e the user has no subscription hence no subscriptionID, then give a trial */

    // IS THE USER NOT NEW BUT CACNCELED HIS SUBSCRIPTION
    /** status still ACTIVE */
    /** i.e the user has a subscriptionID, hence subscription still in period of use, so nothing happens */

    // IS THE CANCELED SUBSCRIPTION PASSED THE PERIOD OF USE?
    /** status CANCELED */
    /** i.e the user has subscriptionID but subscription completely canceled, then no more trial if the user tries to resubscribe */
    

    try {
      if(!foundUser.stripe_subscriptionId){// no subscription
        // create a new session with trial days
        const sessionWithTrial = await stripe.checkout.sessions.create({
          customer: productPriceAndCustomerId[1],
          mode: 'subscription',
          line_items: [
            {
              price: productPriceAndCustomerId[0],
              // For metered billing, do not pass quantity
              quantity: 1,
            },
          ],
          subscription_data: {
            trial_period_days: 1
          },        
          // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
          // the actual Session ID is returned in the query parameter when your customer
          // is redirected to the success page.
          success_url: `${baseUrl}/members/stripe/subscriptionSuccess/{CHECKOUT_SESSION_ID}/${productPriceAndCustomerId[0]}`,
          cancel_url: `${baseUrl}/members/stripe/cintelProducts`,
        });
        if(!sessionWithTrial){ return res.status(400).json({ message: `No session` }) }
        res.status(200).json(sessionWithTrial.url)
      }else{ // in case there is an existing subscription
        // retrieve a subscription from this user
        const subscription = await stripe.subscriptions.retrieve(foundUser.stripe_subscriptionId)
        // check if the existing subscription was already canceled with status
        if(subscription.status === 'canceled'){// in case canceled
          // create a new session but with no more trial days
          const NoTrialSession = await stripe.checkout.sessions.create({
            customer: productPriceAndCustomerId[1],
            mode: 'subscription',
            line_items: [
              {
                price: productPriceAndCustomerId[0],
                // For metered billing, do not pass quantity
                quantity: 1,
              },
            ],      
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: `${baseUrl}/members/stripe/subscriptionSuccess/{CHECKOUT_SESSION_ID}/${productPriceAndCustomerId[0]}`,
            cancel_url: `${baseUrl}/members/stripe/cintelProducts`,
          });
          if(!NoTrialSession){ return res.status(400).json({ message: `No session` }) }
          res.status(200).json(NoTrialSession.url)
        }
      }
    } catch (error) {
      res.status(400).json(error)
    }
  } 
}

export default handler