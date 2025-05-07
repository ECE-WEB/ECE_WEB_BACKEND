const express = require('express');
const app = express();
const { envconfig, connectDB } = require('./config/index');
const api = require('./routers');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', api);

// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        
        app.listen(envconfig.PORT, () => {
            console.log(`Server is running on port ${envconfig.PORT}`);
        });
    })
    .catch((err) => {
        
        process.exit(1); // Exit the process if the connection fails
    });
