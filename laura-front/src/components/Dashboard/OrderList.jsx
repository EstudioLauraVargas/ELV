// OrderList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchOrdersByDocument } from '../../Redux/Actions/actions';

const OrderList = () => {
  const dispatch = useDispatch();
  
  const { orders, ordersByDocument, loading, error } = useSelector(state => state.orders);

  useEffect(() => {
    // Traer todas las órdenes cuando el componente se monta
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
    <div>
      <h1>Lista de Órdenes</h1>
      {orders && orders.length > 0 ? (
  orders.map((order) => (
    <div key={order.orderId}>
      <p>ID: {order.orderId}</p>
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
  ))
) : (
  <p>No orders available</p>
)}

      <h2>Buscar órdenes por documento</h2>
      <input
        type="text"
        placeholder="Ingrese el documento"
        onBlur={(e) => handleSearchByDocument(e.target.value)}
      />
      
      {ordersByDocument &&  ordersByDocument.length > 0 ? (
        ordersByDocument.map((order) => (
        <div key={order.orderId}>
          <p>ID: {order.orderId}</p>
          <p>Amount: {order.amount}</p>
          <p>State: {order.state_order}</p>
          <p>Subscriptions:</p>
          <ul>
            {order.subscriptions.map((sub) => (
              <li key={sub.idSub}>
                ID Sub: {sub.idSub}, Duration: {sub.durationDays} days
              </li>
            ))
            }
          </ul>
        </div>
      ))
    ) : (
  <p>Este Usuario no tien ordenes Ordenes Creadas</p>
)
      }
    </div>
  );
};

export default OrderList;
