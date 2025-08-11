import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  title: String,
  description: String,
  ownerId: mongoose.ObjectId,
  modifiedAt: { type: Date, default: Date.now, required: true },
});

categorySchema.index({ title: 1, ownerId: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category