const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userName: String,
  planName: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium']
  },
  monthlyPrice: Number,
  videoQuality: String,
  numberOfScreens: Number,
  status: {
    type: String,
    default: 'Active'
  },
  startDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
