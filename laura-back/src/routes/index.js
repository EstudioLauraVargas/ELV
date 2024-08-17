const express = require("express");
const router = express.Router();

router.use("/users", require("./authRouter"))
//router.use("/subs", require("./productRouter"));
//router.use("/order", require('./orderDetailRouter'))
router.use('/videos', require('./videoRouter'));



module.exports = router;



