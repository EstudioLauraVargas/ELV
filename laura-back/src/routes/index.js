const express = require("express");


const router = express.Router();

router.use("/auth", require("./authRouter"))
//router.use("/subs", require("./productRouter"));
//router.use("/order", require('./orderDetailRouter'))



module.exports = router;
