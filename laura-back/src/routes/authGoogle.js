const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Middleware para manejar el callback de OAuth
router.get('/auth/callback', async (req, res) => {
    console.log('Query Parameters:', req.query); // Log para ver los parámetros de consulta
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).send('Authorization code not provided.');
    }

    try {
        // Solicitud al servidor de tokens de Google
        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        });

        if (!response.ok) {
            throw new Error(`Token request failed with status ${response.status}`);
        }
        
        const tokenData = await response.json();
        
        console.log('Token Data:', tokenData); // Agrega este log

        // Aquí puedes guardar el token o continuar con el flujo de tu aplicación
        res.status(200).send('Token received successfully.');
    } catch (error) {
        console.error('Failed to obtain access token:', error);
        res.status(500).send('Failed to obtain access token.');
    }
});

module.exports = router;

  



