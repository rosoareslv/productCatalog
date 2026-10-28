import Category from "../models/category.js";
import {
  registerCategoryValidator,
  updateCategoryValidator,
} from "../functions/validators.js";
import { fieldValidationError } from "../handlers/validation.js";

export async function getAll(req, res, next) {
  try {
    let categories = await Category.find({ ownerId: req.userId });
    return res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
}

export async function get(req, res, next) {
  try {
    let category = await Category.findOne({
      _id: req.params["id"],
      ownerId: req.userId,
    });
    if (category == null) {
      return res.status(404).json({
        message: `Category ${req.params["id"]} not found`,
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req, res, next) {
  try {
    let category = await Category.findOneAndDelete({
      _id: req.params["id"],
      ownerId: req.userId,
    });
    if (!category) {
      return res
        .status(404)
        .json({ message: `Category ${req.params["id"]} not found` });
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    let validate = updateCategoryValidator.validate(req.body);
    if (validate.error != undefined) {
      res.validationMessage = validate.error.message;
      return fieldValidationError(req, res);
    }
    req.body.modifiedAt = Date.now();
    let category = await Category.findOneAndUpdate(
      { _id: req.params["id"], ownerId: req.userId },
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    if (!category) {
      return res.status(404).json({
        message: `Category ${req.params["id"]} not found`,
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    let validate = registerCategoryValidator.validate(req.body);
    if (validate.error != undefined) {
      res.validationMessage = validate.error.message;
      return fieldValidationError(req, res);
    }
    let existentCategory = await Category.findOne({
      title: req.body.title,
      ownerId: req.userId,
    });
    if (existentCategory) {
      return res.status(409).json({
        message: `Category with title ${req.body.title} already exists`,
      });
    }
    let body = req.body;
    body.ownerId = req.userId;
    let category = new Category(body);
    await category.save();
    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}
