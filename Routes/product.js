const express=require('express')
const router=express.Router();
const {getProducts,
       newProduct,
       getSingleProduct,
       updateProduct,
       deleteProduct,
       createProductReview,
       getProductReview,
       deleteProductReview,
       getadminProducts}=require('../Controllers/productControllers')
const {isAuthenticatedUser,authorizeRoles }=require('../middleWare/auth')
router.route('/products').get(getProducts);
router.route('/admin/products').get(getadminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser,newProduct);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser,deleteProduct);
router.route('/review').put(isAuthenticatedUser,createProductReview)
router.route('/reviews').get(isAuthenticatedUser,getProductReview)
router.route('/review').delete(isAuthenticatedUser,deleteProductReview)
module.exports=router 