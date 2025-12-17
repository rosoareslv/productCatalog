import Category from "../models/category.js";
import {
  registerCategoryValidator,
  updateCategoryValidator,
} from "../functions/validators.js";

export async function getAllCategories(req, res, next) {
  try {
    let categories = await Category.find({ ownerId: req.userId });
    if (categories.length == 0) {
      return res.status(404).json({
        message: `Sem categorias cadastradas`,
      });
    }
    return res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
}

export async function getCategory(req, res, next) {
  try {
    let category = await Category.findOne({
      _id: req.params["id"],
      ownerId: req.userId,
    });
    if (category == null) {
      return res.status(404).json({
        message: `Categoria ${req.params["id"]} não encontrada`,
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    let category = await Category.findOneAndDelete({
      _id: req.params["id"],
      ownerId: req.userId,
    });
    if (category == null) {
      return res
        .status(404)
        .json({ message: `Categoria ${req.params["id"]} não encontrada` });
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    let categoryValidation = updateCategoryValidator.validate(req.body);
    if (categoryValidation.error != undefined) {
      return res.status(400).json({
        error: categoryValidation.error.message,
      });
    }
    req.body.modifiedAt = Date.now();
    let category = await Category.findOneAndUpdate(
      { _id: req.params["id"], ownerId: req.userId },
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    if (category == null) {
      return res.status(404).json({
        message: `Produto ${req.params["id"]} não encontrado`,
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  try {
    let categoryValidation = registerCategoryValidator.validate(req.body);
    if (categoryValidation.error != undefined) {
      return res.status(400).json({ error: categoryValidation.error.message });
    }
    let existentCategory = await Category.findOne({
      title: req.body.title,
      ownerId: req.userId,
    });
    if (existentCategory) {
      return res.status(403).json({
        message: `Categoria já cadastrada`,
      });
    }
    let body = req.body;
    body.ownerId = req.userId;
    let category = new Category(body);
    await category.save();
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}
