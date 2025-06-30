const { Cashfree, CFEnvironment } = require("cashfree-pg"); 

const { API_ID, SECRET_KEY } =  require('../config/server-config.js');

const db = require('../models/index.js');
const payment = db.Payments;

const cashfree = new Cashfree(CFEnvironment.SANDBOX, API_ID, SECRET_KEY);

const createOrder = async (
    order_amount,
    order_currency='INR',
    order_id,
    customer_id,
    customer_phone
) => {
    try {
        const expiryDate = new Date(Date.now() + 60*60*1000);
        const formattedExpiryDate = expiryDate.toISOString();
        var request = {
            "order_amount": order_amount,
            "order_currency": order_currency,
            "order_id": order_id,
            "customer_details": {
                "customer_id": customer_id,
                "customer_phone": customer_phone
            },
            "order_meta": {
                "return_url": `http://localhost:3000/api/pay/getPaymentStatus/${order_id}`,
                "payment_methods": "cc,dc,upi"
            },
            "order_expiry_time": formattedExpiryDate
        };

        const response = await cashfree.PGCreateOrder(request);
        return response.data.payment_session_id;
    } catch (error) {
        console.log('some error occurred', error);
        throw error;
    }
};

const fetchPaymentStatus = async (orderId) => {
    try {
        const response = await cashfree.PGOrderFetchPayments(orderId);

        let getOrderResponse = response.data;
        let orderStatus;

        if(getOrderResponse.filter(transaction => transaction.payment_status === "SUCCESS").length > 0){
            orderStatus = "SUCCESS"
        }else if(getOrderResponse.filter(transaction => transaction.payment_status === "PENDING").length > 0){
            orderStatus = "PENDING"
        }else{
            orderStatus = "FAILED"
        }

        await payment.update({
            orderStatus: orderStatus
        }, {
            where: {
                orderId : orderId
            }
        });
        return orderStatus;
    } catch (error) {
        console.log('error while fetching the payment status', error);
        throw error;
    }
}

module.exports = {
    createOrder,
    fetchPaymentStatus
}