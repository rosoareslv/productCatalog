const mongoose = require('mongoose');
const { collection } = require('./user');
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  description: String,
  ownerId: mongoose.ObjectId
});

categorySchema.index({ title: 1, ownerId: 1 }, { unique: true })

const Category = mongoose.model('Category', categorySchema);

module.exports = Category