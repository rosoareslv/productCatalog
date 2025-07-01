const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  ownerId: UUID,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product