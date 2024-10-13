import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBenefit } from '../../Redux/Actions/actions'; // Asegúrate de importar la acción correcta

import Navbar from '../Navbar';

const CreateBenefit = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [grantedDate, setGrantedDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!userId || !courseId || !grantedDate || !endDate) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Crear el objeto de beneficio
    const benefitData = {
      userId,
      courseId,
      grantedDate,
      endDate,
    };

    // Despachar la acción para crear el beneficio
    dispatch(createBenefit(benefitData));

    // Reiniciar el formulario
    setUserId('');
    setCourseId('');
    setGrantedDate('');
    setEndDate('');
    setError(null);
  };

  return (
    
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    
      <h2 className="text-2xl font-bold mb-4">Crear Beneficio</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">ID del Usuario</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">ID del Curso</label>
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
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
  );
};

export default CreateBenefit;