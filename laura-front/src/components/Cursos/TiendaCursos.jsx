import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import fondo from '../../lauraassets/bg1.png';

const TiendaCursos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.courses);
  const courses = useSelector((state) => state.courses.data);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <Navbar />
      <div className="pt-16 container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Cursos Disponibles</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.idCourse}
                className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-2xl transition-all"
                onClick={() => navigate(`/curso/${course.idCourse}`)}
              >
                <div className="w-full h-48 bg-gray-200 mb-4 rounded overflow-hidden">
                  <img
                    src={course.imageUrl || '/default-thumbnail.jpg'}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <button
                  onClick={() => navigate(`/curso/${course.idCourse}`)}
                  className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                >
                  Comprar
                </button>
              </div>
            ))
          ) : (
            <p>No hay cursos disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TiendaCursos;
