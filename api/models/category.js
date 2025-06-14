import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  description: String,
  ownerId: UUID,
});

const category = mongoose.model('categorySchema', categorySchema);

module.exports = { category }