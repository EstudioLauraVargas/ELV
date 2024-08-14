const express = require("express");
const router = express.Router();
const createUser = require("../controllers/Users/createUser");
const authUser = require("../controllers/Users/authUser");


router.post("/signup", createUser);

router.post("/signin", authUser);

module.exports = router;