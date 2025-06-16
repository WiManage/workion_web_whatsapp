// models/AppSettings.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  email: { type: String },
}, { collection: 'admins' })

module.exports = mongoose.model('admins', AdminSchema);

