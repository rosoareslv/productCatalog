const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, default: "_noCategory" },
  ownerId: { type: mongoose.ObjectId, required: true },
  modifiedAt: { type: Date, default: Date.now, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
