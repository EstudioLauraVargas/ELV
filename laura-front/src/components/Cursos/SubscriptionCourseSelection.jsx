import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, fetchSubscriptions } from '../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import fondo from '../../lauraassets/bg1.png';

const SubscriptionCourseSelection = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.courses);
  const subscriptions = useSelector((state) => state.subscriptions); 
  const courses = useSelector((state) => state.courses.data);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [maxCourses, setMaxCourses] = useState(0);
  const { userInfo } = useSelector((state) => state.userLogin); 
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getCourses());
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const handleSubscriptionChange = (e) => {
    const selectedSubId = e.target.value;
    setSelectedSubscription(selectedSubId);
    const selectedSub = subscriptions.find((sub) => sub.idSub === parseInt(selectedSubId));
    if (selectedSub) {
      const max = selectedSub.durationDays === 30 ? 1 : selectedSub.durationDays === 180 ? 2 : 3;
      setMaxCourses(max);
      setSelectedCourses(new Array(max).fill(''));  // Reinicia la selección de cursos
    }
  };

  const handleCourseChange = (index, courseId) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = courseId;
    setSelectedCourses(updatedCourses);
  };

  const handlePayment = () => {
    if (!userInfo) {
      navigate('/login'); 
      return;
    }

    if (!window.WompiCheckout) {
      console.error('WompiCheckout no está disponible en window.');
      return;
    }

    // Aquí iniciaremos el proceso de pago con Wompi
    const checkout = new window.WompiCheckout({
      currency: 'COP',
      amountInCents: selectedCourses.length * 100000, // Ajusta según el precio real
      reference: `SUBS-${userInfo.id}-${Date.now()}`,
      publicKey: 'pub_test_udFLMPgs8mDyKqs5bRCWhpwDhj2rGgFw', // Tu clave pública de Wompi
      redirectUrl: 'https://tu-sitio.com/confirmacion-pago',
    });

    checkout.open();
  };

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
      <div className="text-center mt-16 bg-pink-200 bg-opacity-50 p-4 shadow-md rounded-lg">
          <p className="xl:text-4xl text-white font-semibold">Elegí una suscripción y accede a los cursos que quieras.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto text-center mt-10">
          <h1 className="text-4xl font-bold mb-4">Selecciona tu suscripción</h1>

          {/* Select para las suscripciones */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-lg font-medium">Selecciona una suscripción</label>
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

          {/* Selectores de cursos */}
          {selectedSubscription && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Selecciona hasta {maxCourses} curso(s)</h2>
              {[...Array(maxCourses)].map((_, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 mb-2">Curso {index + 1}</label>
                  <select
                    value={selectedCourses[index] || ''}
                    onChange={(e) => handleCourseChange(index, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  >
                    <option value="" disabled>Selecciona un curso</option>
                    {courses && courses.map((course) => (
                      <option key={course.idCourse} value={course.idCourse}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </>
          )}

          {/* Botón para pagar */}
          {selectedSubscription && (
            <button
              className="bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-all"
              onClick={handlePayment}
              disabled={selectedCourses.length !== maxCourses}
            >
              Pagar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCourseSelection;




