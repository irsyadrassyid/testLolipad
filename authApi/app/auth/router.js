const router = require("express").Router();
const authController = require("./controller");

// API     localhost:4500/auth/register
router.post("/register", authController.register);
// API     localhost:4500/auth/login
router.post("/login", authController.login);
// API     localhost:4500/auth/users
router.get("/users", authController.getUser);

module.exports = router;
