const express = require("express");
const router = express.Router();

router.use("/users", require("./authRouter"))
//router.use("/subs", require("./productRouter"));
//router.use("/order", require('./orderDetailRouter'))
router.use('/videos', require('./videoRouter'));


router.get('/auth/google', (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=https://www.googleapis.com/auth/youtube.readonly&state=YOUR_STATE`;
  res.redirect(authUrl);
});

module.exports = router;



