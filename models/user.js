const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  store: { type: String},
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);

