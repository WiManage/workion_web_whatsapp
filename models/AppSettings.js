// models/AppSettings.js
const mongoose = require('mongoose');

const AppSettingsSchema = new mongoose.Schema({
  qr: { type: String},
  // Ajoutez d'autres champs nécessaires
}, { collection: 'appsettings' }); // Force la collection appsettings

module.exports = mongoose.model('AppSettings', AppSettingsSchema);

