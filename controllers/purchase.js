const rarorpay = require('razorpay');

const Order = require('../models/order');

const UserDetails = require('../models/signup');

const tokenController = require('../controllers/login')

exports.purchasePremium = async (req,res,next) => {
    try{
        var rzp = new rarorpay({
            key_id:process.env.Razorpay_key_id,
            key_secret:process.env.Razorpay_key_secret
        })
        const amount = 2500
        rzp.orders.create({amount,currency:'INR'},(err,order) => {
            if(err){
                throw new Error(JSON.stringify(err))
            }
            req.user
                .createOrder({orderId:order.id,status:'PENDING'})
                .then(() => {
                    return res.status(201).json({order,key_id:rzp.key_id})
                })
        })
    }catch(err){
      console.log(err)
      res.status(403).json({message:'Something Went Wrong',error:err})
    }
}

exports.updateTransactionStatus = async (req,res,next) => {
    try{
        const {payment_id,order_id} = req.body;
        const order = await Order.findOne({where:{orderId:order_id}})
        const promise1 = await order.update({paymentId:payment_id,status:'Successfull'})
        const promise2 = await req.user.update({IsPremiumUser:true})
        Promise.all([promise1,promise2]).then(() =>  {
            console.log(req.user.id)
            return res.status(202).json({success:true,message:'Transaction successfull',token:tokenController.generateSecretToken(req.user.id,true)})            
        }).catch(err => {
            console.log(err)
        })
        // const promise3 = order.update({paymentId:payment_id,status:'Failed'})
        // const promise4 = req.user.update({IsPremiumUser:false});
        // Promise.all([promise3,promise4]).then(() => {
        //     return res.status(202).json({success:true,message:'Transaction failed'})
        // }).catch(err => {
        //     console.log(err)       
        // })
    }catch(err){
        console.log(err)
        res.status(403).json({message:'Something went Wrong',error:err})
    }
}

