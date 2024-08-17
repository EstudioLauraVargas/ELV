const axios = require('axios');
const { Video } = require('../data');
const response = require('../utils/response');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

const fetchAndStoreVideos = async (req, res) => {
  try {
    // Obtener la lista de videos del canal desde la API de YouTube
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
      // Si no se encuentran videos nuevos, devolver todos los videos existentes en la base de datos
      const existingVideos = await Video.findAll();
      return response(res, 200, { videos: existingVideos, message: 'No se encontraron videos nuevos. Se devuelven los existentes.' });
    }

    // Obtener detalles de los videos
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

    // Obtener todos los youtube_id que ya existen en la base de datos
    const existingVideos = await Video.findAll({
      where: {
        youtube_id: videoIds,
      },
      attributes: ['youtube_id'],
    });

    // Filtrar los videos que ya existen en la base de datos
    const existingVideoIds = existingVideos.map(video => video.youtube_id);
    const newVideos = videoDetails.filter(video => !existingVideoIds.includes(video.youtube_id));

    if (newVideos.length === 0) {
      // Si no hay nuevos videos, devolver todos los videos existentes en la base de datos
      const allVideos = await Video.findAll();
      return response(res, 200, { videos: allVideos, message: 'No se encontraron videos nuevos. Se devuelven los existentes.' });
    }

    // Filtrar videos cortos
    const shortVideos = newVideos.filter(video => {
      const durationMatch = video.duration.match(/PT(\d+)M(\d+)S/);
      const durationInSeconds = (durationMatch ? (parseInt(durationMatch[1]) * 60) + parseInt(durationMatch[2]) : 0);
      return durationInSeconds < 60;
    });

    // Guardar los nuevos videos en la base de datos
    await Video.bulkCreate(shortVideos, { updateOnDuplicate: ['title', 'description', 'thumbnail', 'playlist_id'] });

    // Devolver los nuevos videos que se han guardado
    response(res, 200, { videos: shortVideos, message: 'Nuevos videos guardados.' });
  } catch (error) {
    console.error('Error al obtener videos de YouTube:', error.message);
    response(res, 500, 'Error al obtener videos.');
  }
};

module.exports = {
  fetchAndStoreVideos,
};

