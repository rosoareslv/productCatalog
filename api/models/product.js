import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  ownerId: UUID,
});

const product = mongoose.model('productSchema', productSchema);

module.exports = { product }