const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", productController.updateProduct);
router.post("/", productController.createProduct);

module.exports = router;
