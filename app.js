const express = require('express');
const userRoutes = require('./src/modules/user/routes');
const rolesRoutes = require('./src/modules/roles/routes');
const permissionRoutes = require('./src/modules/permission/routes');
const resourceRoutes = require('./src/modules/resources/routes');
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const redisClient = require('./utils/redisClient');
const globalErrorHandler = require('./utils/errorHandler');
const cookieParser = require('cookie-parser');
require('./database/db'); // Ensure DB is initialized

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = config.get('server.port') || 3000;

// Initialize Redis connection in server.js
 
redisClient.on('error', (err) => console.error('Redis Client Error:', err));

redisClient.connect();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// User Routes
app.use('/user', userRoutes);
app.use('/roles', rolesRoutes);
app.use('/permission', permissionRoutes);
app.use('/resource', resourceRoutes);

app.use(globalErrorHandler); //global error handler this will handle all the errors

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app };

//entry point for application
