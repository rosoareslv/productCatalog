import express from "express";
import {
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
} from "../controller/category.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);
router.patch("/:id", updateCategory);
router.post("/", createCategory);

export default router;
