/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersByDocument, getCourseById } from '../../Redux/Actions/actions';
import ReactPlayer from 'react-player';

const MisCursos = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const orders = useSelector((state) => state.ordersByDocument);
  const { loading, error } = useSelector((state) => state.ordersByDocument);
  const course = useSelector((state) => state.course);

  // Verificar si el usuario está logueado
  if (!userInfo) {
    return <p>Por favor, inicia sesión.</p>;
  }

  const { document } = userInfo;

  // Log para verificar la información del usuario y órdenes
  console.log('User info:', userInfo);
  console.log('Orders:', orders);

  // Despachar la acción fetchOrdersByDocument
  useEffect(() => {
    if (document) {
      dispatch(fetchOrdersByDocument(document));
    }
  }, [dispatch, document]);

  // Filtrar órdenes activas
  const currentDate = new Date();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activeOrders = orders?.filter((order) => {
    const orderEndDate = new Date(order.endDate);
    return orderEndDate >= currentDate && order.state_order === 'Pendiente';
  }) || [];

  // Log para verificar órdenes activas
  console.log('Active orders:', activeOrders);

  // Obtener los videos del curso en base al idCourse
  useEffect(() => {
    if (activeOrders.length > 0) {
      activeOrders.forEach((order) => {
        order.subscriptions.forEach((subscription) => {
          const { idCourse } = subscription.course;
          console.log(`Fetching videos for course with ID: ${idCourse}`); // Log para verificar el ID del curso
          dispatch(getCourseById(idCourse)); // Despacha la acción para obtener el curso
        });
      });
    }
  }, [dispatch, activeOrders]);

  // Log para verificar el curso en el estado después de la llamada a la API
  console.log('Course state:', course);

  // Manejo de errores
  if (error) return <p>{error}</p>;
  if (loading) return <p>Cargando órdenes...</p>;
  if (activeOrders.length === 0) return <p>No tienes órdenes activas.</p>;

  // Mostrar cursos y videos
  return (
    <div>
      {activeOrders.map((order) => (
        <div key={order.orderId}>
          <h2>Orden: {order.orderId}</h2>
          {order.subscriptions.map((subscription) => (
            <div key={subscription.idSub}>
              <h3>Curso: {subscription.course.title}</h3>

              {/* Mostrar videos del curso */}
              {course?.Videos?.length > 0 ? (
                <ul>
                  {course.Videos.map((video) => (
                    <li key={video.idVideo}>
                      <h4>{video.title}</h4>
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${video.youtube_id}`}
                        controls
                        width="100%"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay videos disponibles para este curso.</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MisCursos;





