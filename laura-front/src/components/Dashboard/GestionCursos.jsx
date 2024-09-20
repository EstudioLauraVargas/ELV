// src/components/GestionCursos.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, createCourse } from "../../Redux/Actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import backgroundImage from "../../lauraassets/bg1.png";
import { openCloudinaryWidget } from "../../cloudinaryConfig"; // Asegúrate del path

const GestionCursos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videos = useSelector((state) => state.videos );

  const [selectedVideos, setSelectedVideos] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  // Estados para manejar la imagen
  const [image, setImage] = useState({
    imageUrl: '',
    imagePublicId: '',
  });

  // Estado para manejar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  useEffect(() => {
    console.log("Videos fetched:", videos);
  }, [videos]);

  const handleImageUpload = () => {
    openCloudinaryWidget((uploadedImage) => {
      if (uploadedImage) {
        setImage({
          imageUrl: uploadedImage.imageUrl,
          imagePublicId: uploadedImage.imagePublicId,
        });
        toast.success("Imagen subida con éxito!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    });
  };

  const handleRemoveImage = () => {
    setImage({
      imageUrl: '',
      imagePublicId: '',
    });
    toast.info("Imagen eliminada.", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación: al menos un video debe ser seleccionado
    if (selectedVideos.length === 0) {
      toast.error("Debes seleccionar al menos un video.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      idVideo: selectedVideos, // Asegúrate de que el backend espera un array de idVideos
      imageUrl: image.imageUrl,
      imagePublicId: image.imagePublicId,
    };

    console.log("Enviando datos al dispatch:", courseData); // Log de depuración

    try {
      const createdCourse = await dispatch(createCourse(courseData)); // Espera a que termine la acción
      console.log("Curso creado exitosamente:", createdCourse); // Log de depuración
      toast.success("Curso creado con éxito!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/panel");
      }, 3000);
    } catch (error) {
      // Manejo de errores en el catch
      toast.error("Error al crear el curso. Inténtalo de nuevo.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error("Error en la creación del curso en el componente:", error); // Log de depuración
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToPanel = () => {
    navigate("/panel");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-4 "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <div className="container mx-auto p-4 mt-24 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-4xl">
        <ToastContainer
          position="bottom-right"
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
          <div className="mb-4">
            <label className="block text-gray-700">Imagen del Curso:</label>
            {image.imageUrl ? (
              <div className="mb-2 flex items-center">
                <img src={image.imageUrl} alt="Course" className="w-48 h-auto mr-4 rounded" loading="lazy" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Eliminar Imagen
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleImageUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Subir Imagen
              </button>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Videos:</label>
            {/* Selector múltiple para seleccionar videos */}
            <select
              multiple
              value={selectedVideos}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions).map(
                  (option) => parseInt(option.value)
                );
                setSelectedVideos(selectedOptions);
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded h-40" // Ajusta la altura según sea necesario
            >
              {videos.map((video) => (
                <option key={video.idVideo} value={video.idVideo}>
                  {video.title}
                </option>
              ))}
            </select>
            <p className="text-gray-500 mt-1">Mantén presionada la tecla Ctrl (Windows) o Cmd (Mac) para seleccionar múltiples videos.</p>
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className={`bg-pink-500 text-white p-2 rounded mr-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creando...' : 'Crear Curso'}
            </button>
            <button
              type="button"
              onClick={handleGoToPanel}
              className="bg-pink-500 text-white px-4 py-2 rounded"
            >
              Ir a Panel
            </button>
          </div>
        </form>
        <h1 className="text-2xl font-bold mb-4">Videos del Canal</h1>
        {videos.length > 0 ? (
          <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                {/* Eliminamos la columna de Selección */}
                <th className="py-2 px-4 border-b">Título</th>
                <th className="py-2 px-4 border-b">Descripción</th>
                <th className="py-2 px-4 border-b">Duración</th>
                <th className="py-2 px-4 border-b">Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.idVideo} className="hover:bg-gray-200">
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
                      loading="lazy"
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










