const { Video } = require('../data');
const { getVideosByChannel, getVideoById, getVideosByPlaylist } = require('../../youtubeService');

// Controlador para obtener y guardar videos por canal
const getAndSaveVideo = async (req, res) => {
  const channelId = process.env.CHANNEL_ID;

  try {
    const videos = await getVideosByChannel(channelId);
    console.log('Fetched videos:', videos)

    const videoPromises = videos.map(video =>
      Video.findOrCreate({
        where: { youtube_id: video.youtube_id },
        defaults: {
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail,
        },
      })
    );

    await Promise.all(videoPromises);

    res.status(200).json({ message: 'Videos fetched and stored successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch and store videos.' });
  }
};

// Controlador para obtener todos los videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos.' });
  }
};

// Controlador para buscar y guardar un video por su ID
const getVideoByIdController = async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await getVideoById(videoId);

    if (video) {
      await Video.findOrCreate({
        where: { youtube_id: video.youtube_id },
        defaults: {
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail,
        },
      });

      res.status(200).json({ message: 'Video fetched and stored successfully!' });
    } else {
      res.status(404).json({ message: 'Video not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch and store video.' });
  }
};

// Controlador para buscar y guardar videos por lista de reproducción
const getVideosByPlaylistController = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const videos = await getVideosByPlaylist(playlistId);

    const videoPromises = videos.map(video =>
      Video.findOrCreate({
        where: { youtube_id: video.youtube_id },
        defaults: {
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail,
        },
      })
    );

    await Promise.all(videoPromises);

    res.status(200).json({ message: 'Videos fetched and stored successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch and store videos.' });
  }
};

module.exports = { 
  getAndSaveVideo, 
  getAllVideos, 
  getVideoByIdController, 
  getVideosByPlaylistController 
};

