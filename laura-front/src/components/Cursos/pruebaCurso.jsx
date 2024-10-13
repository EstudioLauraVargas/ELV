import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../Redux/Actions/actions'; // Asegúrate de que la ruta sea correcta

const PruebaCurso = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses) || [];
  const { loading, error } = useSelector((state) => state.courses); // Ajusta esto a tu estructura de estado

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {courses.map((course) => (
        <div key={course.idCourse}>{course.title}</div> // Ajusta esto según la estructura de tu curso
      ))}
    </div>
  );
};

export default PruebaCurso;
