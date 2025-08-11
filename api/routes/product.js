import express from "express";
import {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controller/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);
router.post("/", createProduct);

export default router;
