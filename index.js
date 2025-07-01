const express = require('express');
const app = express();
const cors = require('cors')
;const { PORT } = require('./src/config/server-config.js');
const apiRoutes = require('./src/routes/index.js');
const paymentApiRoutes = require('./src/routes/payment-routes.js');

const startServer = async () => {

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cors());

    app.use('/api', apiRoutes);
    app.use('/api/pay', paymentApiRoutes);

    app.listen(PORT, () => {
        console.log(`server running on PORT: ${PORT}`);
    })
};

startServer();