const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.processPayments=async(req,res,next)=>{
    const paymentIntent=await stripe.paymentIntent.create({
        amount:req.body.amount,
        currency:'usd',
        metadata:{integration_check:'accept_a_payment'}
    })
    res.status(200).json({
        success:true,
        client_Secret:paymentIntent.client_Secret
    })
}

exports.sendStripeApi=async(req,res,next)=>{
  
    res.status(200).json({
        stripe_api_key:process.env.STRIPE_API_KEY
    })
}