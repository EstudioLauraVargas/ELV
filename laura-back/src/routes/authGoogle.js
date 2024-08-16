const express = require('express');
const router = express.Router();
const { getAccessToken } = require('./path-to-your-function');

// Ruta para redirigir a la autorización de Google
router.get('/auth/google', (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=https://www.googleapis.com/auth/youtube.readonly&state=YOUR_STATE`;
  res.redirect(authUrl);
});

// Ruta para manejar el callback y obtener el token
router.get('/auth/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No authorization code provided.');
  }

  try {
    const tokenData = await getAccessToken(code);
    // Guarda el token y/o usa el tokenData según sea necesario
    res.status(200).send('Token received successfully.');
  } catch (error) {
    res.status(500).send('Failed to obtain access token.');
  }
});

module.exports = router;
