const mongoose = require('mongoose');

const offresSchema = new mongoose.Schema({
  nom: { type: String },
  duree: { type: Number },
  description: { type: String },
  tarif: { type: Number },
  teamsize: { type: Number },
  active: { type: Boolean, default: true },
  avantages: [{ type: String },],
  solution: {
      billing: { type: Boolean, default: false },
      rating: { type: Boolean, default: false  },
      cashflow: { type: Boolean, default: false  },
      agenda: { type: Boolean, default: false },
      contacts: { type: Boolean, default: false  },
      store: { type: Boolean, default: false  },
      market: { type: Boolean, default: false },
      proforma: { type: Boolean, default: false },
      bondelivraison: { type: Boolean, default: false },
  }
}, { collection: 'offres' }); 

module.exports = mongoose.model('offres', offresSchema);

