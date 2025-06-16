const mongoose = require('mongoose');

const abonnementsSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
  offre: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Offres' },
  duree:  { type: Number },
  start: { type: Date },
  end: { type: Date },
  active: { type: Boolean, default: true },
}, { collection: 'abonnements' }); 

module.exports = mongoose.model('abonnements', abonnementsSchema);

