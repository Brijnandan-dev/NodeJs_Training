const express = require('express');
const userRoutes = require('./src/modules/user/routes');
const rolesRoutes = require('./src/modules/roles/routes');
const config = require('config');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { dbConfig } = require('./database/db');
const redisClient = require('./utils/redisClient');
const knex = require('knex');
const globalErrorHandler = require('./utils/errorHandler');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = config.get('server.port') || 3000;
  
  const db = knex(dbConfig); // Create db instance here

  // Initialize Redis connection in server.js
  redisClient.on('error', err => console.error('Redis Client Error:', err));

  redisClient.connect();

  app.use((req, res, next) => {
    req.db = db; // Attach db to req
    next();
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  // User Routes
  app.use('/', userRoutes);
  app.use('/roles', rolesRoutes)

  app.use(globalErrorHandler); //global error handler this will handle all the errors

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

module.exports = {app};

//entry point for application