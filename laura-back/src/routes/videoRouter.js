 const express = require('express');
 const router = express.Router();

 const YouTubeController = require('../controllers/YoutubeController');
const { pruebaGetVideos } = require('../controllers');

 // Ruta para obtener listas de reproducción
 //router.get('/playlists', YouTubeController.fetchPlaylists);
 
 // Ruta para obtener y almacenar videos
 router.get('/videos', YouTubeController.fetchAndStoreVideos);
 router.get('/prueba', pruebaGetVideos)


module.exports = router;
