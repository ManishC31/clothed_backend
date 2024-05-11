const express = require("express");
const { registerUser } = require("../controllers/auth.controller");
const router = express();

router.post("/register", registerUser);

module.exports = router;
