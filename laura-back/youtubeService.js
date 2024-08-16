const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client,
});



const getVideosByChannel = async (tokens, channelId) => {
  try {
    oauth2Client.setCredentials(tokens)
    console.log(`Fetching videos for channel ID: ${channelId}`);

    const response = await youtube.search.list({
      part: 'snippet',
      channelId: channelId,
      maxResults: 5,
      type: 'video',
      order: 'date',
    });

    console.log('API Response:', JSON.stringify(response.data, null, 2));

    const allVideos = response.data.items.map(item => ({
      youtube_id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.default?.url || '',
    }));

    console.log('Extracted Videos:', allVideos);

    if (allVideos.length === 0) {
      console.warn('No videos found from YouTube.');
    }

    return allVideos;
  } catch (error) {
    console.error('Error fetching videos from YouTube:', error);
    throw error;
  }
};

const getVideoById = async (tokens, videoId) => {
  try {
    oauth2Client.setCredentials(tokens)
    console.log(`Fetching video for video ID: ${videoId}`);

    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoId,
    });

    console.log('API Response:', JSON.stringify(response.data, null, 2));

    if (response.data.items.length === 0) {
      console.warn('No video found with the provided ID.');
      return null;
    }

    const item = response.data.items[0];
    return {
      youtube_id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.default?.url || '',
    };
  } catch (error) {
    console.error('Error fetching video from YouTube API:', error);
    throw error;
  }
};

const getVideosByPlaylist = async (tokens, playlistId) => {
  try {
    oauth2Client.setCredentials(tokens)
    console.log(`Fetching videos for playlist ID: ${playlistId}`);

    const response = await youtube.playlistItems.list({
      part: 'snippet',
      playlistId,
      maxResults: 10,
    });

    console.log('API Response:', JSON.stringify(response.data, null, 2));

    const videos = response.data.items.map((item) => ({
      youtube_id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
    }));

    console.log('Extracted Videos:', videos);

    return videos;
  } catch (error) {
    console.error('Error fetching videos by playlist:', error);
    throw error;
  }
};

module.exports = { getVideosByChannel, getVideoById, getVideosByPlaylist };


