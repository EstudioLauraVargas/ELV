import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import backgroundImage from '../../lauraassets/bg1.png';

const MisCursos = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redireccionar
  const { userInfo } = useSelector((state) => state.userLogin);

  // Verificar si el usuario está logueado
  if (!userInfo) {
    return <p className="text-center text-red-500 mt-10">Por favor, inicia sesión.</p>;
  }

  const { document } = userInfo;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/cursos/user/${document}`);
        if (response.data.error) {
          throw new Error(response.data.message);
        }
        setCourses(response.data.data);
      } catch (err) {
        setError(err.message || 'Error al cargar los cursos');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [document]);

  useEffect(() => {
    // Redirigir al home si no hay cursos después de 3 segundos
    if (courses.length === 0 && !loading && !error) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timer); // Limpiar el temporizador
    }
  }, [courses.length, loading, error, navigate]);

  // Manejo de la lógica de visualización
  let content;

  if (loading) {
    content = <p className="text-center text-blue-500 mt-10">Cargando cursos...</p>;
  } else if (courses.length === 0) {
    content = (
      <div className="text-center mt-10">
        <p className="text-gray-500">Aún no tienes cursos disponibles. Redirigiendo al inicio...</p>
      </div>
    );
  } else {
    content = (
      <div className="container mx-auto p-4 mt-12 flex-grow">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Mis Cursos</h1>
        {courses.map((courseData) => {
          const { course, endDate } = courseData;
          return (
            <div key={course.idCourse} className="mb-8 p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">
                Tienes tiempo para ver este curso hasta {new Date(endDate).toLocaleDateString()}.
              </p>
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
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative p-4 flex flex-col justify-between" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar />
      {content}
     
    </div>
  );
};

export default MisCursos;
















