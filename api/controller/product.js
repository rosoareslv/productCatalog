const Product = require("../models/product");
const Category = require("../models/category");
const { updateProductValidator, registerProductValidator } = require("../functions/validators");

async function getAllProducts(req, res, next) {
  try {
    let products = await Product.find({ ownerId: req.userId });
    if (products.length == 0) {
      return res.status(404).json({
        message: `sem produtos cadastrados`,
      });
    }
    return res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    let product = await Product.findOne({
      _id: req.params["id"],
      ownerId: req.userId,
    });
    if (product == null) {
      return res.status(404).json({
        message: `Produto ${req.params["id"]} não identificado`,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    let product = await Product.findOneAndDelete({
      _id: req.params["id"],
      ownerId: req.userId,
    });
    if (product == null) {
      return res.status(404).json({
        message: `Produto ${req.params["id"]} não encontrado`,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    let productValidation = updateProductValidator.validate(req.body);
    if (productValidation.error != undefined) {
      return res.status(400).json({
        error: productValidation.error.message,
      });
    }
    if (req.body.category != undefined) {
      let category = await Category.findOne({
        title: req.body.category,
        ownerId: req.userId,
      });
      if (category == null) {
        return res.status(404).json({
          message: `Categoria ${req.body.category} não identificada`,
        });
      }
    }
    req.body.modifiedAt = Date.now();
    let product = await Product.findOneAndUpdate(
      { _id: req.params["id"], ownerId: req.userId },
      req.body,
      { returnDocument: "after", runValidators: true }
    );
    if (product == null) {
      return res.status(404).json({
        message: `Produto ${req.params["id"]} não encontrado`,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    let productValidation = registerProductValidator.validate(req.body);
    if (productValidation.error != undefined) {
      return res.status(400).json({
        error: productValidation.error.message,
      });
    }
    if (req.body.category != undefined) {
      let category = await Category.findOne({
        title: req.body.category,
        ownerId: req.userId,
      });
      if (category == null) {
        return res.status(404).json({
          message: `Categoria ${req.body.category} não identificada`,
        });
      }
    }
    let body = req.body;
    body.ownerId = req.userId;
    let product = new Product(body);
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = {
    getAllProducts,
    getProduct,
    updateProduct,
    createProduct,
    deleteProduct
}
