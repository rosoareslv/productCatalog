const express = require("express");
const categoryController = require("../controller/category");
const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategory);
router.delete("/:id", categoryController.deleteCategory);
router.patch("/:id", categoryController.updateCategory);
router.post("/", categoryController.createCategory);

module.exports = router;
