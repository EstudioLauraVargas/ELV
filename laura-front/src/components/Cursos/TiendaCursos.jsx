import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom'; 


const TiendaCursos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {  loading, error } = useSelector((state) => state.courses);
  const courses = useSelector((state) => state.courses.data);

  useEffect(() => {
    dispatch(getCourses()); 
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Cursos Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.idCourse}
              className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-2xl transition-all"
              onClick={() => navigate(`/curso/${course.idCourse}`)}

            >
              <div className="w-full h-48 bg-gray-200 mb-4 rounded overflow-hidden">
                {/* Aquí puedes poner una imagen o un espacio que represente el video */}
                <img
                  src={course.videoImage || '/default-thumbnail.jpg'}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              
            </div>
          ))
        ) : (
          <p>No hay cursos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default TiendaCursos;