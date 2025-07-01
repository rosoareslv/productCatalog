const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  description: String,
  ownerId: UUID,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category