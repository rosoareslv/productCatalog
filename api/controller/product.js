import Product from "../models/product.js";
import Category from "../models/category.js";
import {
  updateProductValidator,
  registerProductValidator,
} from "../functions/validators.js";

export async function getAll(req, res, next) {
  try {
    let products = await Product.find({ ownerId: req.userId });
    return res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
}

export async function get(req, res, next) {
  try {
    let product = await Product.findOne({
      _id: req.params["id"],
      ownerId: req.userId,
    });
    if (product == null) {
      return res.status(404).json({
        message: `Product ${req.params["id"]} unknown`,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req, res, next) {
  try {
    let product = await Product.findOneAndDelete({
      _id: req.params["id"],
      ownerId: req.userId,
    });
    if (product == null) {
      return res.status(404).json({
        message: `Product ${req.params["id"]} unknown`,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
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
          message: `Category ${req.body.category} unknown`,
        });
      }
    }
    req.body.modifiedAt = Date.now();
    let product = await Product.findOneAndUpdate(
      { _id: req.params["id"], ownerId: req.userId },
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    if (product == null) {
      return res.status(404).json({
        message: `Product ${req.params["id"]} unknown`,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
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
          message: `Category ${req.body.category} unknown`,
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
