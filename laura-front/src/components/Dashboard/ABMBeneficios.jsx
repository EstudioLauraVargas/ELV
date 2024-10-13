import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBenefit } from '../../Redux/Actions/actions'; // Asegúrate de importar la acción correcta
import axios from 'axios'; // Importa Axios
import backgroundImage from "../../lauraassets/bg1.png";
import Navbar from '../Navbar';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import BenefitsTable from './BenefitsTable';

const CreateBenefit = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [grantedDate, setGrantedDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  
  // Estados para almacenar la lista de usuarios y cursos
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  // Cargar usuarios y cursos cuando el componente se monta
  useEffect(() => {
    // Obtener usuarios
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users'); // Ajusta la ruta a tu endpoint
        if (!response.data.error) {
          setUsers(response.data.data); // Asegúrate de que la estructura de datos sea correcta
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    // Obtener cursos
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/cursos'); // Ajusta la ruta a tu endpoint
        if (!response.data.error) {
          setCourses(response.data.data); // Asegúrate de que la estructura de datos sea correcta
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error al cargar cursos:', error);
      }
    };

    fetchUsers();
    fetchCourses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName || !courseTitle || !grantedDate || !endDate) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const benefitData = {
      userName,
      courseTitle,
      grantedDate,
      endDate,
    };

    dispatch(createBenefit(benefitData));
    toast.success('Beneficio creado exitosamente.');

    // Reiniciar el formulario
    setUserName('');
    setCourseTitle('');
    setGrantedDate('');
    setEndDate('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative p-4" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white mt-32 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Crear Beneficio</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Select para seleccionar el usuario */}
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Nombre del Usuario</label>
            <select
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option value="">Seleccione un usuario</option>
              {users.map((user) => (
                <option key={user.document} value={user.name}>
                  {user.name} {user.lastName} - {user.email} {/* Personaliza el texto de la opción */}
                </option>
              ))}
            </select>
          </div>

          {/* Select para seleccionar el curso */}
          <div className="mb-4">
            <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">Título del Curso</label>
            <select
              id="courseTitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option value="">Seleccione un curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="grantedDate" className="block text-sm font-medium text-gray-700">Fecha de Asignación</label>
            <input
              type="date"
              id="grantedDate"
              value={grantedDate}
              onChange={(e) => setGrantedDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Crear Beneficio
          </button>
        </form>
      </div>

      <BenefitsTable />
    </div>
  );
};

export default CreateBenefit;


