const Product=require('../models/product')
const APIFeatures=require('../Utils/apiFeatures')
exports.newProduct=async (req,res,next)=>{
   req.body.user=req.body.id
    
   const product=await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}

exports.getProducts= async (req,res,next)=>{
    
    
    const apiFeatures=new APIFeatures(Product.find(),req.query).search()
    const products= await apiFeatures.query;
    res.status(200).json({
        success:true,
        message:"This Route will Show Products",
        products
    })
   
}
exports.getSingleProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            message:"No product found"
        })

    }
    res.status(200).json({
        success:true,
        product 
    })
}
exports.updateProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            message:"No product found"
        })

    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
}
exports.deleteProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id) 
    if(!product){
        return res.status(404).json({
            success:false,
            message:"No product found"
        })
    }
    await product.remove
    res.status(200).json({
        success:true,
        message:"product removed"
    })

}
exports.createProductReview=async(req,res,next)=>{
    const {rating,comment,productId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }

    const product=await Product.findById(productId);
    const isReviewed=product.reviews.find(
        r=>r.user.toString()===req.user._id.toString()
    )
    if(isReviewed)
    {
        product.reviews.forEach(review=>{
            if(review.user.toString()===req.user._id.toString())
                    review.comment=comment;
                    review.rating=rating;
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    product.ratings=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length
    await product.save({validateBeforeSave:false}) 
    res.status(200).json({
        success:true,
        product
    })
}
exports.getProductReview=async(req,res,next)=>{
    const product=await Product.findById(req.query.id);
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
}
exports.deleteProductReview=async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);

    const reviews=product.reviews.filter(review=>review._id.toString()!==req.query.id.toString())
    const numOfReviews=reviews.length
    const ratings=product.reviews.reduce((acc,item)=>item.rating+acc,0)/reviews.length
    await Product.findByIdAndUpdate(req.query.productId,{
        ratings,
        reviews,
        numOfReviews
    })
    res.status(200).json({
        success:true,
        
    })
}