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

  useEffect(() => {
    dispatch(getCourses());
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    if (scriptError) {
      toast.error('Error al cargar el sistema de pago.');
    }
  }, [scriptError]);

  const handleSubscriptionChange = (e) => {
    const selectedSubId = parseInt(e.target.value);
    const selectedSub = subscriptions.find((sub) => sub.idSub === selectedSubId);

    if (selectedSub) {
      setSelectedSubscription(selectedSub);
      const max = selectedSub.durationDays === 30 ? 1 : selectedSub.durationDays === 180 ? 2 : 3;
      setMaxCourses(max);
      setSelectedCourses(new Array(max).fill(''));
    } else {
      setSelectedSubscription(null);
      setMaxCourses(0);
      setSelectedCourses([]);
    }
  };

  const handleCourseChange = (index, courseId) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = courseId;
    setSelectedCourses(updatedCourses);
  };

  const handlePayment = async () => {
    // Verifica que el widget de Wompi esté cargado
    if (!scriptLoaded || typeof window.WidgetCheckout === 'undefined') {
      toast.error('Por favor, espere mientras se carga la opción de pago.');
      return;
    }

    // Verifica si el usuario está logueado
    if (!userInfo) {
      navigate('/login');
      return;
    }

    // Verifica que haya una suscripción seleccionada
    if (!selectedSubscription) {
      toast.error("Por favor, selecciona una suscripción.");
      return;
    }

    // Verifica que todos los cursos estén seleccionados
    if (selectedCourses.some(courseId => !courseId)) {
      toast.error("Por favor, selecciona todos los cursos.");
      return;
    }

    // Calcula el monto total
    const totalAmount = selectedCourses.length * selectedSubscription.price;

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

    // Muestra el spinner de carga
    setIsProcessing(true);

    try {
      const resultAction = await dispatch(createOrder(orderData));
      if (resultAction.type === 'ORDER_CREATE_SUCCESS') {
        const createdOrder = resultAction.payload;
        toast.success('Orden creada exitosamente.');

        // Inicializa el Widget de Wompi
        const checkout = new window.WidgetCheckout({
          amountInCents: createdOrder.amount * 100,
          reference: createdOrder.orderId,
          publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY,
          redirectUrl: 'https://elv.vercel.app/pay',
          currency: "COP",
          signature: createdOrder.signature, 
        });

        // Abre el widget de pago
        checkout.open(function (result) {
          const transaction = result.transaction;

          // Llamar a la función para actualizar la orden
          updateOrderWithTransactionId(createdOrder.orderId, transaction.id, transaction.status);
        });

      } else {
        toast.error('Error al crear la orden.');
      }
    } catch (err) {
      toast.error(`Error durante el proceso de pago: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateOrderWithTransactionId = async (orderId, transactionId, status) => {
    try {
      const response = await fetch('/api/orders/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          transactionId,
          status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Orden actualizada correctamente.');
      } else {
        toast.error('Error al actualizar la orden: ' + data.error);
      }
    } catch (error) {
      toast.error('Error en la comunicación con el servidor.');
    }
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






