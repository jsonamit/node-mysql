const express = require("express");
const { signup, login, getUsers } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
