const express = require('express');
const { 
  getAndSaveVideo, 
  getAllVideos, 
  getVideoByIdController, 
  getVideosByPlaylistController 
} = require('../controllers/getAndSaveVideo');

const router = express.Router();

router.get('/channel', getAndSaveVideo);
router.get('/all', getAllVideos);
router.get('/video/:videoId', getVideoByIdController);
router.get('/playlist/:playlistId', getVideosByPlaylistController);

module.exports = router;
