import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, updateCourse } from "../../Redux/Actions/actions"; 
import axios from "axios";
import Navbar from "./Navbar";
import backgroundImage from "../../lauraassets/bg1.png"
import { BASE_URL } from "../../Config";

const EditarCurso = () => {
  const { idCourse } = useParams(); // Obtener el ID del curso desde la URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [removedVideos, setRemovedVideos] = useState([]);
  const videos = useSelector((state) => state.videos || []);

  useEffect(() => {
    // Obtener detalles del curso actual
    
    axios
    .get(`${BASE_URL}/cursos/${idCourse}`)
    .then((response) => {
      console.log(response.data); // Verifica la estructura de los datos
      const { title, description, Videos } = response.data.data;
      setTitle(title);
      setDescription(description);
      setSelectedVideos(Videos || []);
    })
    .catch((error) => {
      console.error("Error al obtener los detalles del curso:", error);
    });
  

    // Obtener la lista de videos disponibles para agregar
    dispatch(fetchVideos());
  }, [dispatch, idCourse]);

  const handleUpdateCourse = () => {
    const updatedCourseData = {
      title,
      description,
      addVideos: selectedVideos.map((video) => video.idVideo), // Solo IDs
      removeVideos: removedVideos.map((video) => video.idVideo), // Solo IDs
    };
  
    console.log('Datos a enviar:', updatedCourseData); // Agrega esto para verificar los datos
  
    dispatch(updateCourse(idCourse, updatedCourseData))
      .then(() => {
        navigate("/listarCursos");
      })
      .catch((error) => {
        console.error("Error al actualizar el curso:", error);
        toast.error("Error al actualizar el curso");
      });
  };
  

  const handleVideoChange = (e) => {
    const videoId = parseInt(e.target.value, 10);
    const selectedVideo = videos.find((video) => video.idVideo === videoId);
  
    if (selectedVideo) {
      if (selectedVideos.some((v) => v.idVideo === selectedVideo.idVideo)) {
        setSelectedVideos(selectedVideos.filter((v) => v.idVideo !== selectedVideo.idVideo));
      } else {
        setSelectedVideos([...selectedVideos, selectedVideo]);
      }
    }
  };
  
  const handleRemoveVideo = (idVideo) => {
    const videoToRemove = selectedVideos.find((video) => video.idVideo === idVideo);
    if (videoToRemove) {
      setRemovedVideos([...removedVideos, videoToRemove]);
      setSelectedVideos(selectedVideos.filter((video) => video.idVideo !== idVideo));
    }
  };
  const handleGoToPanel = () => {
    navigate("/panel");
  };
  
  return (
    <div
    className="min-h-screen bg-cover bg-center relative p-4 mt-4"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
        <Navbar/>
        <div className="container mx-auto p-4 mt-24 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-4xl">     
      <h1 className="text-2xl font-bold mb-4">Editar Curso</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Título del Curso:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción del Curso:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Videos Actuales:</label>
  {selectedVideos.length > 0 ? (
    <ul>
      {selectedVideos.map((video) => (
        <li key={video.idVideo} className="flex justify-between items-center mb-2">
          <div>
            <img src={video.thumbnail} alt={video.title} className="w-16 h-auto inline-block mr-2" />
            <span>{video.title}</span>
          </div>
          <button
            onClick={() => handleRemoveVideo(video.idVideo)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay videos seleccionados.</p>
  )}
</div>


<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Agregar Videos:</label>
  <select
    onChange={(e) => handleVideoChange(e)}
    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Seleccionar Video</option>
    {videos.map((video) => (
      <option key={video.idVideo} value={video.idVideo}>
        {video.title}
      </option>
    ))}
  </select>
</div>


      <button
        onClick={handleUpdateCourse}
        className="bg-pink-500 text-white px-4 py-2 rounded mr-4"
      >
        Actualizar Curso
      </button>
      <button
        onClick={handleGoToPanel}
        className="bg-pink-500 text-white px-4 py-2 rounded"
      >
        Ir a Panel
      </button>
    </div>
    </div>
  );
};

export default EditarCurso;
