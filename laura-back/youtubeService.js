// youtubeService.js
const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

const getVideosByChannel = async (channelId) => {
  try {
    const response = await youtube.search.list({
      channelId,
      part: 'snippet',
      maxResults: 10,
      type: 'video',
    });

    return response.data.items.map((item) => ({
      youtube_id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

const getVideoById = async (videoId) => {
  try {
    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoId,
    });

    if (response.data.items.length === 0) {
      return null; // Video not found
    }

    const item = response.data.items[0];
    return {
      youtube_id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
    };
  } catch (error) {
    console.error('Error fetching video from YouTube API:', error);
    throw error;
  }
};

const getVideosByPlaylist = async (playlistId) => {
  try {
    const response = await youtube.playlistItems.list({
      part: 'snippet',
      playlistId,
      maxResults: 10,
    });

    return response.data.items.map((item) => ({
      youtube_id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  } catch (error) {
    console.error('Error fetching videos by playlist:', error);
    throw error;
  }
};

module.exports = { getVideosByChannel, getVideoById, getVideosByPlaylist };



