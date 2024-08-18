import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSubscription, updateSubscription } from '../../../Redux/Actions/actions';
import { useParams, useNavigate } from 'react-router-dom';

const SubscriptionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idSub } = useParams();
  const { subscriptions } = useSelector((state) => state.subscriptions);
  
  const [formData, setFormData] = useState({
    typeSub: '',
    accessStartDate: '',
    durationDays: '',
    price: '',
    active: true,
    subscriptionReminderSent: false,
  });

  useEffect(() => {
    if (idSub) {
      const subscription = subscriptions.find((sub) => sub.idSub === parseInt(idSub));
      if (subscription) {
        setFormData(subscription);
      }
    }
  }, [idSub, subscriptions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idSub) {
      dispatch(updateSubscription(idSub, formData));
    } else {
      dispatch(createSubscription(formData));
    }
    navigate('/panel');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{idSub ? 'Editar Suscripción' : 'Crear Suscripción'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Suscripción</label>
          <input
            type="text"
            name="typeSub"
            value={formData.typeSub}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Inicio</label>
          <input
            type="date"
            name="accessStartDate"
            value={formData.accessStartDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Duración (días)</label>
          <input
            type="number"
            name="durationDays"
            value={formData.durationDays}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">Activa</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="subscriptionReminderSent"
              checked={formData.subscriptionReminderSent}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">Recordatorio de suscripción enviado</span>
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          {idSub ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
