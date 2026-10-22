import express from "express";
import {
  getAll,
  get,
  deleteOne,
  update,
  create,
} from "../controller/product.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.delete("/:id", deleteOne);
router.patch("/:id", update);
router.post("/", create);

export default router;
