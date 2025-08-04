const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const { registerCategory, updateCategory } = require("../functions/validators");

router.get("/", async (req, res, next) => {
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
});

router.get("/:id", async (req, res, next) => {
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
});

router.delete("/:id", async (req, res, next) => {
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
});

router.patch("/:id", async (req, res, next) => {
  try {
    let categoryValidation = updateCategory.validate(req.body);
    if (categoryValidation.error != undefined) {
      return res.status(400).json({
        error: categoryValidation.error.message,
      });
    }
    req.body.modifiedAt = Date.now();
    let category = await Category.findOneAndUpdate(
      { _id: req.params["id"], ownerId: req.userId },
      req.body,
      { returnDocument: "after", runValidators: true }
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
});

router.post("/", async (req, res, next) => {
  try {
    let categoryValidation = registerCategory.validate(req.body);
    if (categoryValidation.error != undefined) {
      return res.status(400).json({ error: categoryValidation.error.message });
    }
    let body = req.body;
    body.ownerId = req.userId;
    let category = new Category(body);
    await category.save();
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
