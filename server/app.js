const express = require('express');
const errorHandler = require('./errors/error-handler');
const usersController = require('./controllers/users-controller');
const productsController = require('./controllers/products-controller');
const cartsController = require('./controllers/carts-controller');
const ordersController = require('./controllers/orders-controller');

const loginFilter = require('./middleware/login-filter');
const cors = require('cors');
const registerSocketConnections = require('./socket/index');

const server = express();
server.use(express.static('./uploads'));
server.use(cors({ origin: "http://localhost:4200", credentials: true }));
server.use(loginFilter());
server.use(express.json());

server.use('/users', usersController);
server.use('/products', productsController);
server.use('/carts', cartsController);
server.use('/orders', ordersController);




server.use(errorHandler);

registerSocketConnections(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));