import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubscriptions,
  deleteSubscription,
} from "../../../Redux/Actions/actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import backgroundImage from "../../../lauraassets/bg1.png";
import { FaEdit, FaTrash } from "react-icons/fa";

const SubscriptionList = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSubscriptions()).then(() => {
      setLoading(false); // Cambia el estado de carga cuando los datos estén listos
    });
  }, [dispatch]);

  const handleDelete = (idSub) => {
    dispatch(deleteSubscription(idSub));
  };

  const handleGoToPanel = () => {
    navigate("/panel");
  };

  // Muestra un mensaje de carga mientras los datos están cargando
  if (loading) {
    return <div className="text-center py-4">Cargando suscripciones...</div>;
  }

  // Muestra un mensaje si no hay suscripciones
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="text-center py-4">No se encontraron suscripciones.</div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-4 "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />

      <div className="container mx-auto p-4 mt-24 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleGoToPanel}
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            Ir a Panel
          </button>
          <h1 className="text-2xl font-bold text-center flex-grow">
            Suscripciones
          </h1>
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Tipo</th>
              <th className="py-2 px-4 text-left">Precio</th>
              <th className="py-2 px-4 text-left">Editar / Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.idSub} className="border-b">
                <td className="py-2 px-4">{sub.typeSub}</td>
                <td className="py-2 px-4">${sub.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b flex items-center ml-6">
                  <Link
                    to={`/editarSubs/${sub.idSub}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(sub.idSub)}
                    className="text-gray-500 hover:underline"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionList;
