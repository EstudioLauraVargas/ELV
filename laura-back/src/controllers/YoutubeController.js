const axios = require('axios');
const { Video } = require('../data');
const response = require('../utils/response');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

const fetchAndStoreVideos = async (req, res) => {
  try {
    // Obtener la lista de videos del canal
    const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        channelId: CHANNEL_ID,
        maxResults: 50,
        order: 'date',
        type: 'video',
        key: YOUTUBE_API_KEY,
      },
    });

    const videoIds = videoResponse.data.items.map(item => item.id.videoId);

    if (videoIds.length === 0) {
      return response(res, 404, null, 'No se encontraron videos.');
    }

    const videoDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails',
        id: videoIds.join(','),
        key: YOUTUBE_API_KEY,
      },
    });

    const videoDetails = videoDetailsResponse.data.items.map(item => ({
      youtube_id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      playlist_id: item.snippet.playlistId || null,
      duration: item.contentDetails.duration,
    }));

    const shortVideos = videoDetails.filter(video => {
      const durationMatch = video.duration.match(/PT(\d+)M(\d+)S/);
      const durationInSeconds = (durationMatch ? (parseInt(durationMatch[1]) * 60) + parseInt(durationMatch[2]) : 0);
      return durationInSeconds < 60;
    });

    await Video.bulkCreate(shortVideos, { updateOnDuplicate: ['title', 'description', 'thumbnail', 'playlist_id'] });

    response(res, 200, { videos: shortVideos });
  } catch (error) {
    console.error('Error al obtener videos de YouTube:', error.message);
    response(res, 500, 'Error al obtener videos.');
  }
};

module.exports = {
  fetchAndStoreVideos,
};