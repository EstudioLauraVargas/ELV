import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, fetchSubscriptions, createOrder } from '../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import fondo from '../../lauraassets/bg1.png';
import { toast } from 'react-toastify';
import useScript from '../../useScript'; // Asegúrate de que la ruta es correcta

const SubscriptionCourseSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Acceder al estado de Redux
  const { loading, error } = useSelector((state) => state.courses);
  const subscriptions = useSelector((state) => state.subscriptions); 
  const courses = useSelector((state) => state.courses.data);
  const { userInfo } = useSelector((state) => state.userLogin); 

  // Estados locales
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [maxCourses, setMaxCourses] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false); // Nuevo estado

  // Cargar el script de Wompi usando el hook
  const { loaded: scriptLoaded, error: scriptError } = useScript('https://checkout.wompi.co/widget.js');

  // Logs para depuración
  console.log('Component mounted. Fetching courses and subscriptions.');

  useEffect(() => {
    dispatch(getCourses());
    dispatch(fetchSubscriptions());
    console.log('Dispatched getCourses and fetchSubscriptions actions.');
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Error loading courses or subscriptions:', error);
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    if (scriptError) {
      console.error('Error loading WompiCheckout script.');
      toast.error('Error al cargar el sistema de pago.');
    }
  }, [scriptError]);

  useEffect(() => {
    if (scriptLoaded) {
      if (typeof window.WidgetCheckout !== 'undefined') {
        console.log('WidgetCheckout está disponible en window.');
      } else {
        console.error('WidgetCheckout no está disponible en window.');
      }
    }
  }, [scriptLoaded]);

  const handleSubscriptionChange = (e) => {
    const selectedSubId = parseInt(e.target.value);
    const selectedSub = subscriptions.find((sub) => sub.idSub === selectedSubId);
    console.log('Selected subscription ID:', selectedSubId, 'Subscription object:', selectedSub);

    if (selectedSub) {
      setSelectedSubscription(selectedSub);
      const max = selectedSub.durationDays === 30 ? 1 : selectedSub.durationDays === 180 ? 2 : 3;
      setMaxCourses(max);
      setSelectedCourses(new Array(max).fill(''));
      console.log(`Set maxCourses to ${max} based on subscription duration.`);
    } else {
      setSelectedSubscription(null);
      setMaxCourses(0);
      setSelectedCourses([]);
      console.log('No subscription selected. Resetting course selections.');
    }
  };

  const handleCourseChange = (index, courseId) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = courseId;
    setSelectedCourses(updatedCourses);
    console.log(`Selected course at index ${index}:`, courseId);
  };

  const handlePayment = async () => {
    console.log('Initiating payment process.');

    if (!scriptLoaded || typeof window.WidgetCheckout === 'undefined') {
      console.error('WidgetCheckout no está disponible aún.');
      toast.error('Por favor, espere mientras se carga la opción de pago.');
      return;
    }

    if (!userInfo) {
      console.log('User not logged in. Redirecting to login.');
      navigate('/login'); 
      return;
    }

    if (!selectedSubscription) {
      console.log('No subscription selected.');
      toast.error("Por favor, selecciona una suscripción.");
      return;
    }

    if (selectedCourses.some(courseId => !courseId)) {
      console.log('Not all courses selected.');
      toast.error("Por favor, selecciona todos los cursos.");
      return;
    }

    const totalAmount = selectedCourses.length * selectedSubscription.price;
    console.log('Total amount calculated:', totalAmount);

    const orderData = {
      date: new Date().toISOString().split('T')[0],
      amount: totalAmount,
      subscriptions: selectedCourses.map(courseId => ({
        idSub: selectedSubscription.idSub,
        idCourse: parseInt(courseId),
        price: selectedSubscription.price,
        typeSub: selectedSubscription.typeSub,
        durationDays: selectedSubscription.durationDays,
        
      })),
      state_order: 'Pendiente',
      document: userInfo.document,
      currency: 'COP',
    };

    console.log('Order data to be dispatched:', orderData);

    setIsProcessing(true); // Iniciar estado de procesamiento

    try {
      const resultAction = await dispatch(createOrder(orderData));

      console.log('Result of createOrder action:', resultAction);

      if (resultAction.type === 'ORDER_CREATE_SUCCESS') {
        const createdOrder = resultAction.payload;
        console.log('Order created successfully:', createdOrder);
        toast.success('Orden creada exitosamente.');

        if (typeof window.WidgetCheckout === 'undefined') {
          console.error('WidgetCheckout no está disponible en window.');
          toast.error('Error al iniciar el pago.');
          setIsProcessing(false);
          return;
        }

        const checkout = new window.WidgetCheckout({
          
          amountInCents: createdOrder.amount * 100,
          reference: createdOrder.orderId,
          publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY || 'pub_test_udFLMPgs8mDyKqs5bRCWhpwDhj2rGgFw',
          redirectUrl: 'http://localhost:5173/pay',
          currency: "COP", // Asegúrate de reemplazar con tu URL real
          // Agrega otros campos opcionales según sea necesario
          signature: createdOrder.signature, // Asegúrate de obtener el signature desde tu backend
          // Puedes agregar campos opcionales como taxInCents, customerData, shippingAddress, etc.
        });

        console.log('Opening WidgetCheckout with order:', createdOrder);
        checkout.open(function (result) {
          var transaction = result.transaction;
          console.log("Transaction ID: ", transaction.id);
          console.log("Transaction object: ", transaction);
          // Puedes manejar la respuesta aquí, como actualizar el estado de la orden en tu backend
        });
      } else if (resultAction.type === 'ORDER_CREATE_FAIL') {
        console.error('Error al crear la orden:', resultAction.payload);
        toast.error(`Error al crear la orden: ${resultAction.payload}`);
      }
    } catch (err) {
      console.error('Error durante el proceso de pago:', err);
      toast.error(`Error durante el proceso de pago: ${err.message}`);
    } finally {
      setIsProcessing(false); // Finalizar estado de procesamiento
    }
  };

  if (loading) {
    console.log('Loading courses and subscriptions...');
    return <div>Cargando...</div>;
  }

  if (error) {
    console.log('Error loading data:', error);
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
          <p className="xl:text-4xl text-white font-semibold">Elige una suscripción y accede a los cursos que quieras.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto text-center mt-10">
          <h1 className="text-4xl font-bold mb-4">Selecciona tu suscripción</h1>

          {/* Select para las suscripciones */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-lg font-medium">Selecciona una suscripción</label>
            <select
              id="subscription"
              value={selectedSubscription ? selectedSubscription.idSub : ''}
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
              className={`bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-all ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handlePayment}
              disabled={selectedCourses.some(courseId => !courseId) || isProcessing} // Deshabilitar si está procesando
            >
              {isProcessing ? 'Procesando...' : 'Pagar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCourseSelection;






