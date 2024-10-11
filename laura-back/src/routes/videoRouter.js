 const express = require('express');
const { createVideo, getVideos, deleteVideo } = require('../controllers/videosControllers');
 const router = express.Router();

 
 // Ruta para obtener y almacenar videos
 router.get('/', getVideos);
 router.post('/', createVideo)
 router.delete('/:idVideo', deleteVideo)
 //router.put('/:idVideo', videosControllers)

module.exports = router;
