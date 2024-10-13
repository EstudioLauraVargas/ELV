import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBenefits } from '../../Redux/Actions/actions'; // Asegúrate de que la ruta sea correcta
import { toast } from 'react-toastify';

const BenefitsTable = () => {
  const dispatch = useDispatch();

  // Obtener el estado de benefits desde Redux
  const benefits  = useSelector((state) => state.benefits);

  // Despachar la acción para obtener los beneficios
  useEffect(() => {
    dispatch(fetchBenefits());
  }, [dispatch]);

  // Mostrar error si ocurre
  

  if (!benefits || benefits.length === 0) {
    return <div>No hay beneficios otorgados.</div>;
  }

  return (
    <div className="overflow-x-auto mt-8 mb-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Course ID</th>
            <th className="py-2 px-4 border-b">Fecha de Finalización</th>
          </tr>
        </thead>
        <tbody>
  {benefits.map((benefit) => (
    <tr key={benefit.id} className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b text-center">{benefit.userId}</td>
      <td className="py-2 px-4 border-b text-center">{benefit.User.name}</td> {/* Nombre del usuario */}
      <td className="py-2 px-4 border-b text-center">{benefit.Course.title}</td> {/* Título del curso */}
      <td className="py-2 px-4 border-b text-center">{new Date(benefit.endDate).toLocaleDateString()}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default BenefitsTable;
