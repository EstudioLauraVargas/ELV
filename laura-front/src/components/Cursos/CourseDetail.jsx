import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourseById, fetchSubscriptions } from '../../Redux/Actions/actions'; 

const CourseDetail = () => {
  const { idCourse } = useParams();
  const dispatch = useDispatch();
  
  const { loading, error } = useSelector((state) => state.courses);
  const subscriptions = useSelector((state) => state.subscriptions); 
  const course = useSelector((state) => state.course);
  const [selectedSubscription, setSelectedSubscription] = useState('');  

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

  const handleSubscriptionChange = (e) => {
    setSelectedSubscription(e.target.value); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{course.description}</p>

        {/* Select para las suscripciones */}
        <div className="mb-4">
          <label htmlFor="subscription" className="block text-gray-700 mb-2 text-lg font-medium">
            Selecciona una suscripción
          </label>
          <select
            id="subscription"
            value={selectedSubscription}
            onChange={handleSubscriptionChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="" disabled>Elige una suscripción</option>
            {subscriptions && subscriptions.map((sub) => (
              <option key={sub.idSub} value={sub.idSub}>
                {sub.typeSub} - {sub.durationDays} días - ${sub.price}
              </option>
            ))}
          </select>
        </div>

        {/* Botón para comprar */}
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => alert(`Has seleccionado la suscripción: ${selectedSubscription}`)}
          disabled={!selectedSubscription}  // Deshabilitar si no se selecciona una suscripción
        >
          Comprar curso
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;

