const Product = require('../models/product');

//Create new product => /api/v1/product/new
// const productController ={
//     newProduct: async(req,res,next)=>{
//         try{
//             const product = new Product.create(req.body);
//             res.status(200).json({
//                 success:true,
//                 product
//             })

//         }catch(err){
//             res.status(500).json(err);
//         }
//     }
// }
exports.newProduct=async(req,res,next)=>{
            try{
                const product = new Product.create(req.body);
                res.status(200).json({
                    success:true,
                    product
                })
    
            }catch(err){
                res.status(500).json(err);
            }
        }
module.exports.getProducts =(req,res,next)=>{
    res.status(200).json({
        success:true,
        message: 'this route will show all products in database',
    })
}
// module.exports = productController;