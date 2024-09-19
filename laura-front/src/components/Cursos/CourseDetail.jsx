import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, fetchSubscriptions } from '../../Redux/Actions/actions'; 
import Navbar from '../Navbar'; 
import fondo from '../../lauraassets/bg1.png'; 

const CourseDetail = () => {
  const { idCourse } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.courses);
  const course = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourseById(idCourse));  
    dispatch(fetchSubscriptions());  
  }, [dispatch, idCourse]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>No se encontró el curso</div>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center "
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <Navbar />
      <div className="pt-16 container mx-auto py-8">
      <div className="text-center mt-16 bg-pink-200 bg-opacity-50 p-4 shadow-md rounded-lg">
          <p className="xl:text-4xl text-white font-semibold">Elige una suscripción y accede a los cursos que quieras.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto text-center mt-16">
        <img
                    src={course.imageUrl || '/default-thumbnail.jpg'}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{course.description}</p>

          {/* Botón para comprar */}
          <button
            className="bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-all"
            onClick={() => navigate('/suscCourse')}
          >
            Comprar curso
          </button>
        </div>
        {/* Propaganda */}
       
      </div>
    </div>
  );
};

export default CourseDetail;


