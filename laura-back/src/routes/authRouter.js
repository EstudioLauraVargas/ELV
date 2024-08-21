const express = require("express");
const router = express.Router();
const createUser = require("../controllers/Users/createUser");
const authUser = require("../controllers/Users/authUser");
const { getAllUser } = require("../controllers");


router.post("/signup", createUser);

router.post("/signin", authUser);

router.get("/", getAllUser)

module.exports = router;