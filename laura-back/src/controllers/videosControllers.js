const { Video } = require("../data");

// Crear un nuevo video
module.exports = {
  createVideo: async (req, res) => {
    try {
      const { url, title, description } = req.body;
      const newVideo = await Video.create({ url, title, description });
      res.status(201)
        .json({
          message: "Video created successfully",
          data: newVideo,
        });
    } catch (error) {
      res.status(500).json({ message: "Error creating Video", error });
    }
  },

  // Obtener todos los capacitacions
  getVideos: async (req, res) => {
    try {
      const Videos = await Video.findAll();
      res.status(200).json({ data: Videos });
    } catch (error) {
      res.status(500).json({ message: "Error fetching videos", error });
    }
  },

  // Eliminar un video
  deleteVideo: async (req, res) => {
    try {
      const { id } = req.params;
      await Video.destroy({ where: { id } });
      res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting Video", error });
    }
  },
};