import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions, deleteSubscription } from '../../../Redux/Actions/actions';
import { Link } from 'react-router-dom';

const SubscriptionList = () => {
  const dispatch = useDispatch();
  const subscriptionsState = useSelector(state => state.subscriptionsReducer || {}); // Verifica el nombre correcto del estado
  const { subscriptions = [], loading, error } = subscriptionsState;

  console.log("Subscriptions state:", subscriptionsState); // Verifica el estado completo
  console.log("Subscriptions array:", subscriptions); // Verifica el array de suscripciones

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Suscripciones</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inicio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subscriptions.length > 0 ? (
            subscriptions.map((sub) => (
              <tr key={sub.idSub}>
                <td className="px-6 py-4 whitespace-nowrap">{sub.idSub}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sub.typeSub}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(sub.accessStartDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sub.durationDays} días</td>
                <td className="px-6 py-4 whitespace-nowrap">${sub.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/edit-subscription/${sub.idSub}`} className="text-blue-600 hover:text-blue-800 mr-4">Editar</Link>
                  <button
                    onClick={() => handleDelete(sub.idSub)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center">No hay suscripciones disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionList;
