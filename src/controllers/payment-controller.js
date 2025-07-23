const { createOrder, fetchPaymentStatus } =  require('../services/payment-service.js');
const db = require('../models/index.js');
const payment = db.Payments;
const user = db.users;

const { sequelize } = require('../models/index.js');


const processPayment = async (req, res) => {
    const request = {
    order_amount:'2500',
    order_currency:'INR',
    order_id:'ORDER-'+ Date.now(),
    customer_id:'1',
    customer_phone:"9999999999"
    }
    // const t = await sequelize.transaction();
    try {
        console.log('this is the reqbody', req.body);
        const paymentSessionId = await createOrder(
            request.order_amount,
            request.order_currency,
            request.order_id,
            request.customer_id,
            request.customer_phone
        );
            
        await payment.create({
            orderId: request.order_id,
            orderAmount: request.order_amount,
            orderCurrency: request.order_currency,
            paymentSessionId:paymentSessionId,
            orderStatus: 'PENDING',
            userId: req.body.userId
        })

        await user.update({
            isPremium: 'TRUE'
        }, {
            where : {
                id: req.body.userId
            }
        });

        // await t.commit();
        return res.status(200).json({
            data:{payment_session_id:paymentSessionId, order_id:request.order_id},
            success:true,
            message:'Transaction successfull',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller',error);
        // await t.rollback;
        return res.status(500).json({
            data:{},
            success:true,
            message:'Transaction Failed',
            error:error
        });
    };
}

const FetchPaymentStatus = async (req, res) => {
    try {
        const response = await fetchPaymentStatus(req.params.orderId);
        return res.status(200).json({
            TRANSACTION_STATUS:response,
            success:true,
            message:'Transaction Sucessfull!!',
            error:{}
        })
    } catch (error) {
        console.log('some error occured at controller',error.reponse);
        return res.status(200).json({
            data:{},
            success:false,
            message:'Transaction Failed',
            error:error
        });
    }
}

module.exports={
    processPayment,
    FetchPaymentStatus
}