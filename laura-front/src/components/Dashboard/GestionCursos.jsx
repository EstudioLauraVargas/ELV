import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, createCourse } from "../../Redux/Actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

  const handleCheckboxChange = (idVideo) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.includes(idVideo)
        ? prevSelected.filter((id) => id !== idVideo)
        : [...prevSelected, idVideo]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const courseData = {
      title: courseTitle,
      description: courseDescription,
      idVideo: selectedVideos
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
        }, 3000); // Redirige después de 3 segundos (el tiempo que dura el toast)
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

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Curso</h1>
      <form onSubmit={handleSubmit} className="mb-4">
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
          className="bg-blue-500 text-white p-2 rounded"
        >
          Crear Curso
        </button>
      </form>
      <h1 className="text-2xl font-bold mb-4">Videos del Canal</h1>
      {videos.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
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
              <tr key={video.idVideo} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">
                  <input
                    type="checkbox"
                    checked={selectedVideos.includes(video.idVideo)}
                    onChange={() => handleCheckboxChange(video.idVideo)}
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
  );
};

export default GestionCursos;


