const express = require("express");
const router = express.Router();

router.use("/users", require("./authRouter"))
//router.use("/subs", require("./productRouter"));
router.use("/order", require('./orderRouter'))
router.use('/videos', require('./videoRouter'));
router.use("/cursos", require("./cursosRouter"));
router.use("/suscripcion", require("./subsRouter"));
router.use("/eventos", require("./webhookRouter"));
router.use("/benefits", require('./benefitsRouter'))



module.exports = router;



