require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { verifyToken } = require('./auth');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', 
}));

const youtubeApiKey = process.env.YOUTUBE_API_KEY;

// Ruta para obtener información de videos de YouTube
app.get('/youtube/video/:id', verifyToken, async (req, res) => {
  const videoId = req.params.id;
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeApiKey}&part=snippet,contentDetails,statistics`);
    const videoData = response.data.items[0];
    res.json(videoData);
  } catch (error) {
    res.status(500).send('Error fetching video data');
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});



