import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Importa useSelector de Redux
import axios from 'axios';
import ReactPlayer from 'react-player';
import Navbar from '../Navbar';
import backgroundImage from "../../lauraassets/bg1.png";

const MisCursos = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener la información del usuario desde Redux
  const { userInfo } = useSelector((state) => state.userLogin);

  // Verificar si el usuario está logueado
  if (!userInfo) {
    return <p className="text-center text-red-500 mt-10">Por favor, inicia sesión.</p>;
  }

  const { document } = userInfo; // Obtener el 'document' del usuario

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/cursos/user/${document}`);
        if (response.data.error) {
          throw new Error(response.data.message);
        }
        setCourses(response.data.data); // Establece la data de los cursos
      } catch (err) {
        setError(err.message || "Error al cargar los cursos");
      } finally {
        setLoading(false);
      }
    };

    // Llama a la función solo si el documento existe
    fetchCourses();
  }, [document]);

  if (loading) return <p className="text-center text-blue-500 mt-10">Cargando cursos...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (courses.length === 0) return <p className="text-center text-gray-500 mt-10">No tienes cursos disponibles.</p>;

  return (
    <div className="min-h-screen bg-cover bg-center relative p-4" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar />
      <div className="container mx-auto p-4 mt-12">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Mis Cursos</h1>

        {courses.map((courseData) => {
          const { course, endDate } = courseData; // Extrae el curso y la fecha de finalización
          return (
            <div key={course.idCourse} className="mb-8 p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>

              {/* Mostrar la fecha de finalización */}
              <p className="text-gray-600 mb-4">
                Tienes tiempo para ver este curso hasta {new Date(endDate).toLocaleDateString()}.
              </p>

              {/* Mostrar videos */}
              {course.Videos && course.Videos.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {course.Videos.map((video) => (
                    <li key={video.idVideo} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-2">{video.title}</h4>
                      <div className="relative pb-[56.25%] h-0 overflow-hidden">
                        <ReactPlayer url={video.url} controls width="100%" height="100%" className="absolute top-0 left-0" />
                      </div>
                      <p className="text-gray-700 mt-2">{video.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No hay videos disponibles para este curso.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MisCursos;














