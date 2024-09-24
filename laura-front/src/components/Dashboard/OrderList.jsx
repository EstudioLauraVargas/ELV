import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchOrdersByDocument } from "../../Redux/Actions/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import backgroundImage from "../../lauraassets/bg1.png";

const OrderList = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state);
  const orders = useSelector((state) => state.orders);
  const ordersByDocument = useSelector((state) => state.ordersByDocument);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleSearchByDocument = (document) => {
    dispatch(fetchOrdersByDocument(document));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <div className="container mx-auto p-4 mt-24 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-4xl">
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          style={{ zIndex: 9999 }}
        />

        <h1 className="text-2xl font-bold text-center mb-4">Lista de Órdenes</h1>

        {orders && orders.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-12 border-b">ID Orden</th>
                <th className="py-2 px-4 border-b">Usuario</th>
                <th className="py-2 px-10 border-b">Finaliza</th>
                <th className="py-2 px-4 border-b">Costo</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Suscripcion</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-100">
                  <td className="py-2 px-12 border-b">{order.orderId}</td>
                  <td className="py-2 px-4 border-b">{order.document}</td>
                  <td className="py-2 px-4 border-b">{order.endDate}</td>
                  <td className="py-2 px-10 border-b">${order.amount}</td>
                  <td className="py-2 px-4 border-b">{order.state_order}</td>
                  <td className="py-2 px-4 border-b">
                    <ul>
                      {order.subscriptions.map((sub) => (
                        <li key={sub.idSub}>
                          {sub.durationDays} días
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay órdenes disponibles.</p>
        )}

        <h2 className="text-xl font-semibold mt-6">Buscar órdenes por documento</h2>
        <input
          type="text"
          placeholder="Ingrese el documento"
          onBlur={(e) => handleSearchByDocument(e.target.value)}
          className="mt-2 p-2 border rounded w-full"
        />

        {ordersByDocument && ordersByDocument.length > 0 ? (
          <div className="mt-4">
            {ordersByDocument.map((order) => (
              <div key={order.orderId} className="border-b py-2">
                <p>ID: {order.orderId}</p>
                <p>Usuario: {order.document}</p>
                <p>End Date: {order.endDate}</p>
                <p>Amount: {order.amount}</p>
                <p>State: {order.state_order}</p>
                <p>Subscriptions:</p>
                <ul>
                  {order.subscriptions.map((sub) => (
                    <li key={sub.idSub}>
                      ID Sub: {sub.idSub}, Duration: {sub.durationDays} days
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">Este Usuario no tiene órdenes creadas.</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;


