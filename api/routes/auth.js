const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/register", authController.create);
router.post("/login", authController.login);
router.get("/refresh", authController.refresh);

module.exports = router;
