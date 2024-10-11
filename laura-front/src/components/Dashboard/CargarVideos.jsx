import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos, removeVideo, uploadVideo } from '../../Redux/Actions/actions'; 
import { openCloudinaryWidget } from '../../cloudinaryConfig'; // Tu función para abrir el widget

import { FaTrash } from 'react-icons/fa';

const VideoUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");  
  const [description, setDescription] = useState("");  
    
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos || []); 

  // Fetch videos on component mount
  useEffect(() => {
    console.log('Fetching videos...');
    dispatch(fetchVideos());
  }, [dispatch]);

  // Handle video upload from Cloudinary and send to backend
  const handleUpload = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    openCloudinaryWidget(async (url) => {
        // Asegúrate de que `url` contenga los campos correctos
        const videoUrl = url.imageUrl; // URL del video subido
        const videoTitle = "Tu título aquí"; // Asegúrate de proporcionar un título real
        const videoDescription = "Tu descripción aquí"; // Asegúrate de proporcionar una descripción real

        // Crea el objeto de video con el formato que espera el backend
        const videoData = {
            url: videoUrl,
            title: videoTitle,
            description: videoDescription,
        };

        try {
            console.log('Dispatching uploadVideo action with data:', videoData);
            // Enviar el objeto al backend usando la action uploadVideo
            await dispatch(uploadVideo(videoData));
            setSuccess(true);
        } catch (err) {
            setError('Error al guardar el video. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    });
};

  const handleDelete = (idVideo) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este video?');
    if (confirmed) {
      dispatch(removeVideo(idVideo)); // Assuming removeVideo handles deletion from Cloudinary/backend
    }
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      
      <h1 className="bg-ColorMorado text-2xl font-bold font-nunito p-2 text-gray-200 mb-8 mt-28">Cargar Video</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500 font-nunito">¡Video guardado exitosamente!</p>}

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleUpload}
            className={`bg-ColorAzul hover:bg-blue-300 text-gray-600 font-bold font-nunito py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Subir Video'}
          </button>
        </div>
      </div>

      {/* Sección de videos cargados */}
      <h1 className="bg-ColorMorado text-2xl font-bold font-nunito p-2 text-gray-200 mb-8">Videos Cargados</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {videos.length === 0 ? (
          <p className="text-gray-500">No hay videos cargados.</p>
        ) : (
          <ul className="space-y-4">
            {videos.map(video => (
              <li key={video.idVideo} className="flex justify-between items-center border-b pb-2 font-nunito">
                <span className="text-gray-700">{video.url}</span>
                <button onClick={() => handleDelete(video.idVideo)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;




