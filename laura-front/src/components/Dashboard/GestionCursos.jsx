import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, createCourse } from "../../Redux/Actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import backgroundImage from "../../lauraassets/bg1.png";

const GestionCursos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videos = useSelector((state) => state.videos || []);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  useEffect(() => {
    console.log("Videos fetched:", videos);
  }, [videos]);

  const handleCheckboxChange = (idVideo) => {
    setSelectedVideos((prevSelected) => {
      const isSelected = prevSelected.includes(idVideo);
      const updatedSelected = isSelected
        ? prevSelected.filter((id) => id !== idVideo)
        : [...prevSelected, idVideo];
      
      console.log("Checkbox toggled:", idVideo);
      console.log("Updated selectedVideos:", updatedSelected);
      
      return updatedSelected;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación: al menos un video debe ser seleccionado
    if (selectedVideos.length === 0) {
      toast.error("Debes seleccionar al menos un video.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      idVideo: selectedVideos // Asegúrate de que el backend espera un array de idVideos
    };
    dispatch(createCourse(courseData))
      .then(() => {
        toast.success("Curso creado con éxito!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/panel");
        }, 3000); 
      })
      .catch((error) => {
        toast.error("Error al crear el curso. Inténtalo de nuevo.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleGoToPanel = () => {
    navigate("/panel");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-4 mt-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <div className="container mx-auto p-4 mt-24 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-4xl">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          style={{ zIndex: 9999 }}
        />
        <h1 className="text-2xl font-bold mb-4">Crear Nuevo Curso</h1>
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Título del Curso:</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción:</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white p-2 rounded mr-4"
          >
            Crear Curso
          </button>
          <button
            type="button"
            onClick={handleGoToPanel}
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            Ir a Panel
          </button>
        </form>
        <h1 className="text-2xl font-bold mb-4">Videos del Canal</h1>
        {videos.length > 0 ? (
          <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Seleccionar</th>
                <th className="py-2 px-4 border-b">Título</th>
                <th className="py-2 px-4 border-b">Descripción</th>
                <th className="py-2 px-4 border-b">Duración</th>
                <th className="py-2 px-4 border-b">Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.idVideo} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border-b text-center">
                    <input
                      type="checkbox"
                      value={video.idVideo}
                      checked={selectedVideos.includes(video.idVideo)}
                      onChange={() => handleCheckboxChange(video.idVideo)}
                      className="form-checkbox"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{video.title}</td>
                  <td className="py-2 px-4 border-b">
                    {video.description || "Sin descripción"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {video.duration
                      ? video.duration.replace("PT", "").toLowerCase()
                      : "Duración no disponible"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-16 h-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay videos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default GestionCursos;





