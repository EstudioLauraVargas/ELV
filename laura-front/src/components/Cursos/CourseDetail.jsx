import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById, fetchSubscriptions } from '../../Redux/Actions/actions'; 
import Navbar from '../Navbar'; 
import fondo from '../../lauraassets/bg1.png'; 

const CourseDetail = () => {
  const { idCourse } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCourse = useSelector((state) => state.currentCourse);

console.log("Estado actual de currentCourse:", currentCourse);
  useEffect(() => {
    console.log("idCourse:", idCourse);
    dispatch(fetchCourseById(idCourse));  
    dispatch(fetchSubscriptions())
  }, [ idCourse,dispatch]);

  // Log del estado actual de currentCourse




  if (!currentCourse) {
    return <div>Cargando...</div>; // Puedes mostrar un indicador de carga
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <Navbar />
      <div className="pt-16 container mx-auto py-8">
        <div className="text-center mt-16 bg-pink-200 bg-opacity-50 p-4 shadow-md rounded-lg">
          <p className="xl:text-4xl text-white font-semibold">
            Elige una suscripción y accede a los cursos que quieras.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto text-center mt-16">
          <img
            src={currentCourse.imageUrl}
            alt={currentCourse.title}
            className="object-cover w-full h-full"
          />
          <h1 className="text-4xl font-bold mb-4">{currentCourse.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{currentCourse.description}</p>
          <button
            className="bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-all"
            onClick={() => navigate('/suscCourse')}
          >
            Comprar curso
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;



