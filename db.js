// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://CheikhM:Mongo123@cluster0.e8pz3ms.mongodb.net/orionrating?retryWrites=true&w=majority', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Arrêter l'application si la connexion échoue
  }
};

module.exports = connectDB;
