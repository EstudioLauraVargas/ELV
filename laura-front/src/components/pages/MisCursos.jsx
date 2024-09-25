import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersByDocument, getCourseById } from '../../Redux/Actions/actions';
import ReactPlayer from 'react-player';
import Navbar from '../Navbar';
import backgroundImage from "../../lauraassets/bg1.png"

const MisCursos = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const orders = useSelector((state) => state.ordersByDocument);
  const { loading, error } = useSelector((state) => state.ordersByDocument);
  const course = useSelector((state) => state.course);

  // Verificar si el usuario está logueado
  if (!userInfo) {
    return <p className="text-center text-red-500 mt-10">Por favor, inicia sesión.</p>;
  }

  const { document } = userInfo;

  // Despachar la acción fetchOrdersByDocument
  useEffect(() => {
    if (document) {
      dispatch(fetchOrdersByDocument(document));
    }
  }, [dispatch, document]);

  // Filtrar órdenes activas
  const currentDate = new Date();
  const activeOrders = orders?.filter((order) => {
    const orderEndDate = new Date(order.endDate);
    return orderEndDate >= currentDate && order.state_order === 'Pendiente';
  }) || [];

  // Obtener los videos del curso en base al idCourse
  useEffect(() => {
    if (activeOrders.length > 0) {
      activeOrders.forEach((order) => {
        order.subscriptions.forEach((subscription) => {
          const { idCourse } = subscription.course;
          dispatch(getCourseById(idCourse));
        });
      });
    }
  }, [dispatch, activeOrders]);

  // Función para formatear la fecha a DD-MM-AA
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Manejo de errores
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (loading) return <p className="text-center text-blue-500 mt-10">Cargando órdenes...</p>;
  if (activeOrders.length === 0) return <p className="text-center text-gray-500 mt-10">No tienes órdenes activas.</p>;

  // Mostrar cursos y videos
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
                <h3 className="text-xl font-semibold mb-2">Curso: {subscription.course.title}</h3>

                {/* Mostrar videos del curso */}
                {course?.Videos?.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {course.Videos.map((video) => (
                      <li key={video.idVideo} className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">{video.title}</h4>
                        <div className="relative pb-[56.25%] h-0 overflow-hidden">
                          <ReactPlayer
                            url={`https://www.youtube.com/embed/${video.youtube_id}?controls=1&modestbranding=1&rel=0&disablekb=1&fs=0`}
                            controls
                            width="100%"
                            height="100%"
                            className="absolute top-0 left-0"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
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






