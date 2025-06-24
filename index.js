const express = require('express');
const app = express();

const { PORT } = require('./src/config/server-config.js');
const apiRoutes = require('./src/routes/index.js');

const startServer = async () => {

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`server running on PORT: ${PORT}`);
    })
};

startServer();