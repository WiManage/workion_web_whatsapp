// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://workion:workion1*!prod@185.207.250.27:26017/workion_prod?retryWrites=true&w=majority', {
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Arrêter l'application si la connexion échoue
  }
};

module.exports = connectDB;
