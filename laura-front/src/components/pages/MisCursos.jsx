import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersByDocument, getCourseById } from '../../Redux/Actions/actions';
import ReactPlayer from 'react-player';
import Navbar from '../Navbar';
import backgroundImage from "../../lauraassets/bg1.png";

const MisCursos = () => {
  const dispatch = useDispatch();

  // Obtener información del usuario logueado
  const { userInfo } = useSelector((state) => state.userLogin);
  const orders = useSelector((state) => state.ordersByDocument);
  const { loading, error } = useSelector((state) => state.ordersByDocument);
  const courses = useSelector((state) => state.courses); // courses es un array
  console.log("Estado del curso en Redux (courses):", courses);

  const [loadedCourses, setLoadedCourses] = useState(new Set());

  if (!userInfo) {
    return <p className="text-center text-red-500 mt-10">Por favor, inicia sesión.</p>;
  }

  const { document } = userInfo;

  // Fetch de las órdenes basadas en el documento del usuario
  useEffect(() => {
    if (document) {
      dispatch(fetchOrdersByDocument(document));
    }
  }, [dispatch, document]);

  const currentDate = new Date();

  // Verificar si orders está definido antes de filtrar
  const activeOrders = orders?.length > 0 
    ? orders.filter(order => {
        const orderEndDate = new Date(order.endDate);
        return orderEndDate >= currentDate && order.state_order === 'Pendiente';
      }) 
    : [];

  console.log("Órdenes activas:", activeOrders);

  // Cargar los cursos relacionados con las órdenes activas
  useEffect(() => {
    if (activeOrders.length > 0) {
      activeOrders.forEach((order) => {
        console.log("Procesando orden:", order);
        order.subscriptions.forEach((subscription) => {
          const { idCourse } = subscription.course; // Cambia courses a course
          console.log("Procesando suscripción con idCourse:", idCourse);

          if (!loadedCourses.has(idCourse)) {
            console.log("Curso no cargado, dispatch getCourseById para idCourse:", idCourse);
            dispatch(getCourseById(idCourse));
            setLoadedCourses((prev) => new Set(prev).add(idCourse));
          } else {
            console.log("Curso ya cargado:", idCourse);
          }
        });
      });
    }
  }, [dispatch, activeOrders, loadedCourses]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (loading) return <p className="text-center text-blue-500 mt-10">Cargando órdenes...</p>;
  if (activeOrders.length === 0) return <p className="text-center text-gray-500 mt-10">No tienes órdenes activas.</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <div className="container mx-auto p-4 mt-12">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Mis Cursos</h1>

        {activeOrders.map((order) => (
          <div key={order.orderId} className="mb-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Disponible para verlo hasta {formatDate(order.endDate)}
            </h2>

            {order.subscriptions.map((subscription) => (
              <div key={subscription.idSub} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Curso: {subscription.course.title}</h3> {/* Cambiar courses a course */}

                {/* Mostrar el estado del curso y sus videos */}
                {courses.length > 0 && courses.find(c => c.idCourse === subscription.course.idCourse)?.Videos?.length > 0 ? (
                  <>
                    {/* <p> Cantidad  Videos de este Curso: {courses.find(c => c.idCourse === subscription.course.idCourse).Videos.length}</p> */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.find(c => c.idCourse === subscription.course.idCourse).Videos.map((video) => (
                        <li key={video.idVideo} className="bg-gray-100 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold mb-2">{video.title}</h4>
                          <div className="relative pb-[56.25%] h-0 overflow-hidden">
                            <ReactPlayer
                              url={video.url}
                              controls
                              width="100%"
                              height="100%"
                              className="absolute top-0 left-0"
                            />
                          </div>
                          <p className="text-gray-700 mt-2">{video.description}</p>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-gray-500">No hay videos disponibles para este curso.</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisCursos;













