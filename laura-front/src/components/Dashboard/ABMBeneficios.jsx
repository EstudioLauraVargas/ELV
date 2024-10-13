import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBenefit } from '../../Redux/Actions/actions'; // Asegúrate de importar la acción correcta
import backgroundImage from "../../lauraassets/bg1.png";
import Navbar from '../Navbar';
import { toast, ToastContainer } from 'react-toastify'; // Importa toast y ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de react-toastify
import BenefitsTable from './BenefitsTable';

const CreateBenefit = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(''); // Cambiado a userName
  const [courseTitle, setCourseTitle] = useState(''); // Cambiado a courseTitle
  const [grantedDate, setGrantedDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!userName || !courseTitle || !grantedDate || !endDate) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Crear el objeto de beneficio con userName y courseTitle
    const benefitData = {
      userName,
      courseTitle,
      grantedDate,
      endDate,
    };

    // Despachar la acción para crear el beneficio
    dispatch(createBenefit(benefitData));

    // Mostrar notificación de éxito
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
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Nombre del Usuario</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">Título del Curso</label>
            <input
              type="text"
              id="courseTitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
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

