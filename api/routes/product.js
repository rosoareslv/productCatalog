const express = require("express");
const Product = require("../models/product");
const Category = require("../models/category");
const { updateProduct, registerProduct } = require("../helper/validators");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let products = await Product.find({ ownerId: req.requestorUUID });
    if (products.length == 0) {
      return res.status(404).json({
        message: `sem produtos cadastrados`,
      });
    }
    return res
      .status(200)
      .json({ total: products.length, success: true, products: products });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let product = await Product.findOne({
      _id: req.params["id"],
      ownerId: req.requestorUUID,
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
});

router.delete("/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndDelete({
      _id: req.params["id"],
      ownerId: req.requestorUUID,
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
});

router.patch("/:id", async (req, res, next) => {
  try {
    let productValidation = updateProduct.validate(req.body);
    if (productValidation.error != undefined) {
      return res.status(400).json({
        error: productValidation.error.message,
      });
    }
    if (req.body.category != undefined) {
      let category = await Category.findOne({
        title: req.body.category,
        ownerId: req.requestorUUID,
      });
      if (category == null) {
        return res.status(404).json({
          message: `Categoria ${req.body.category} não identificada`,
        });
      }
    }
    req.body.modifiedAt = Date.now();
    let product = await Product.findOneAndUpdate(
      { _id: req.params["id"], ownerId: req.requestorUUID },
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
});

router.post("/", async (req, res, next) => {
  try {
    let productValidation = registerProduct.validate(req.body);
    if (productValidation.error != undefined) {
      return res.status(400).json({
        error: productValidation.error.message,
      });
    }
    if (req.body.category != undefined) {
      let category = await Category.findOne({
        title: req.body.category,
        ownerId: req.requestorUUID,
      });
      if (category == null) {
        return res.status(404).json({
          message: `Categoria ${req.body.category} não identificada`,
        });
      }
    }
    let body = req.body;
    body.ownerId = req.requestorUUID;
    let product = new Product(body);
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
