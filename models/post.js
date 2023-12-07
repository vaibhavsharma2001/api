// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, default: true },
  geoLocation: { type: { type: String, enum: ['Point'], required: true }, coordinates: [Number] },
}, { timestamps: true });

const post = mongoose.model('Post', postSchema);

module.exports = post;
