const { Course, Video, Benefit, OrderCompra, Subscription } = require("../data"); // Asegúrate de que OrderCompra y Subscription estén correctamente importados
const response = require("../utils/response");

const getCursosByDocument = async (req, res) => {
  try {
    const { document } = req.params; // Este es el documento del usuario

    // 1. Verifica si Benefit está definido antes de hacer la consulta
    let activeBenefits = [];
    if (Benefit) {
      activeBenefits = await Benefit.findAll({
        where: { userId: document }, // Busca por el userId o documento
        include: {
          model: Course,
          include: {
            model: Video,
            through: { attributes: [] }, // Excluir la tabla intermedia `CourseVideos`
          },
        },
      });
    }

    // 2. Verifica si OrderCompra está definido antes de hacer la consulta
    let userOrders = [];
    if (OrderCompra) {
      userOrders = await OrderCompra.findAll({
        where: { document }, // Busca las órdenes por el documento del usuario
        include: {
          model: Subscription, // Incluye Subscription para acceder a Course
          include: {
            model: Course,
            include: {
              model: Video,
              through: { attributes: [] }, // Excluir la tabla intermedia `CourseVideos`
            },
          },
        },
      });
    }

    // 3. Extraer los cursos de los beneficios
    const benefitCourses = activeBenefits.map((benefit) => ({
      course: benefit.Course,
      grantedDate: benefit.grantedDate,
      endDate: benefit.endDate,
    }));

    // 4. Extraer los cursos de las órdenes de compra
    const purchasedCourses = userOrders.flatMap((order) => 
      order.Subscriptions.map((subscription) => ({
        course: subscription.Course,
        grantedDate: order.createdAt, // Usamos la fecha de creación de la orden
        endDate: null, // Las órdenes de compra no tienen una fecha de fin
      }))
    );

    // 5. Combinar los cursos obtenidos de beneficios y órdenes
    const allCourses = [...benefitCourses, ...purchasedCourses];

    if (allCourses.length === 0) {
      return response(res, 404, null, "No hay cursos disponibles para este usuario");
    }

    // 6. Enviar la respuesta con los cursos, videos, y fechas de disponibilidad
    response(res, 200, allCourses, "Cursos obtenidos correctamente");
  } catch (error) {
    console.error("Error al obtener los cursos por usuario:", error);
    response(res, 500, null, "Error al obtener los cursos por usuario");
  }
};

module.exports = getCursosByDocument;





