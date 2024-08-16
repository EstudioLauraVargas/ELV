const express = require('express');
const { getAndSaveVideo, getAllVideos, getVideoByIdController, getVideosByPlaylistController } = require('../controllers/getAndSaveVideo');
const {authenticate, authorize} = require("../controllers/Users/authMiddleware")
const router = express.Router();

router.get('/channel',authenticate, getAndSaveVideo);
router.get('/all',authenticate, getAllVideos);
router.get('/video/:videoId',authenticate, getVideoByIdController);
router.get('/playlist/:playlistId',authenticate, getVideosByPlaylistController);

module.exports = router;
