import express from "express";
import { create, login, refresh } from "../controller/auth.js";
import { getRefreshToken } from "../middleware/token.js";

const router = express.Router();

router.post("/register", create);
router.post("/login", login);
router.get("/refresh", getRefreshToken, refresh);

export default router;
