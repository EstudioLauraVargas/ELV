const axios = require('axios');
const { Video } = require('../data'); 

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

const getAndSaveVideos = async () => {
  try {
    // Obtener la lista de videos del canal
    const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet,contentDetails',
        channelId: CHANNEL_ID,
        maxResults: 50,
        order: 'date',
        type: 'video',
        key: YOUTUBE_API_KEY,
      },
    });

    // Obtener detalles adicionales de los videos
    const videoDetails = await Promise.all(videoResponse.data.items.map(async (item) => {
      // Obtener detalles de cada video, incluyendo la lista de reproducción
      const detailsResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'snippet,contentDetails',
          id: item.id.videoId,
          key: YOUTUBE_API_KEY,
        },
      });

      const videoData = detailsResponse.data.items[0];
      return {
        youtube_id: videoData.id,
        title: videoData.snippet.title,
        description: videoData.snippet.description,
        thumbnail: videoData.snippet.thumbnails.high.url,
        playlist_id: videoData.snippet.playlistId || null, // Extrae el ID de la lista de reproducción
      };
    }));

    // Guardar los videos en la base de datos
    await Video.bulkCreate(videoDetails, { updateOnDuplicate: ['title', 'description', 'thumbnail', 'playlist_id'] });

    return videoDetails;
  } catch (error) {
    console.error('Error al obtener videos de YouTube:', error);
    throw error;
  }
};

module.exports = {
  getAndSaveVideos,
};

