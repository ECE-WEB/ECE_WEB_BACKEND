const mongoose = require('mongoose');
const  envconfig  = require('./envconfig'); 

async function databaseconnection() {
  try {
    await mongoose.connect(envconfig.MONGO_URI); 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process on connection failure
  }
}

module.exports = databaseconnection;
