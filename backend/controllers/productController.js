const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
// const { param } = require("../routes/productRoute");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
//const ApiFeatures = require("../utils/apifeatures");

//create product
//..............................
// exports.createProduct = async (req,res,next)=>{

//     const product = await Product.create(req.body);

//     res.status(201).json({
//         success: true,
//         product,
//     });
// };
//................................


//create product--admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

//Get all Product 
exports.getAllProduct = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,

    });
});

//get product details
//----------------------
// exports.getProductDetails  = async(req,res,next)=>{
//     const product = await Product.findById(req.params.id);

//     if(!product){
//         return res.status(500).json({
//             success: false,
//             message: "Product not found",
//         })
//     }
//     res.status(200).json({
//         success: true,
//         product
//     })

// }
//-------------------------
//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
        productCount,
    });

});

//update products- admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    // if(!product){
    //     return res.status(500).json({
    //         success: false,
    //         message: "product not found",
    //     });
    // };

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product,
    });

});

//Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    // if(!product){
    //     return res.status(500).json({
    //         success: false,
    //         message: "product not found",

    //     })
    // }

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product delete success ",
    });
});