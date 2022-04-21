const express=require('express')
const router=express.Router();
const {processPayments, sendStripeApi}=require('../Controllers/paymentController')
const {isAuthenticatedUser,authorizeRoles }=require('../middleWare/auth')

router.route('/payment/process').post(isAuthenticatedUser,processPayments);
router.route('/stripeapi').get(sendStripeApi);

module.exports=router 