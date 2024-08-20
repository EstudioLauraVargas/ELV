import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptionById, updateSubscription } from "../../../Redux/Actions/actions";
import Navbar from '../Navbar';
import backgroundImage from "../../../lauraassets/bg1.png";

function EditSubscription() {
  const { idSub } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subscription = useSelector((state) => state.subscriptions);

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);


  const [typeSub, setTypeSub] = useState("");
  const [accessStartDate, setAccessStartDate] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(false);
  const [subscriptionReminderSent, setSubscriptionReminderSent] = useState(false);

  
  useEffect(() => {
    dispatch(fetchSubscriptionById(idSub));
  }, [dispatch, idSub]);

  useEffect(() => {
    if (subscription && subscription.accessStartDate) {
        setTypeSub(subscription.typeSub);
        setAccessStartDate(subscription.accessStartDate.split('T')[0]); 
        setDurationDays(subscription.durationDays);
        setPrice(subscription.price);
        setActive(subscription.active);
        setSubscriptionReminderSent(subscription.subscriptionReminderSent);
    }
}, [subscription]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const subscriptionData = {
      typeSub,
      accessStartDate,
      durationDays,
      price,
      active,
      subscriptionReminderSent,
    };

    dispatch(updateSubscription(idSub, subscriptionData))
      .then(() => {
        navigate('/panel'); 
      })
      .catch((error) => {
        console.error("Error updating subscription:", error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const handleGoToPanel = () => {
    navigate("/panel");
  };
  return (
    <div
    className="min-h-screen bg-cover bg-center relative p-4 mt-4"
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
    Editar Suscripción
  </h1>
</div>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="typeSub" className="block text-gray-700">Tipo de Suscripción</label>
            <input
              type="text"
              id="typeSub"
              value={typeSub}
              onChange={(e) => setTypeSub(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="accessStartDate" className="block text-gray-700">Fecha De Inicio</label>
            <input
              type="date"
              id="accessStartDate"
              value={accessStartDate}
              onChange={(e) => setAccessStartDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="durationDays" className="block text-gray-700">Duración (días)</label>
            <input
              type="number"
              id="durationDays"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Precio</label>
            <input
              type="number"
              step="0.01"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="active" className="block text-gray-700">Activa</label>
            <input
              type="checkbox"
              id="active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subscriptionReminderSent" className="block text-gray-700">Reminder Sent</label>
            <input
              type="checkbox"
              id="subscriptionReminderSent"
              checked={subscriptionReminderSent}
              onChange={(e) => setSubscriptionReminderSent(e.target.checked)}
              className="mt-1"
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Editar
          </button>
        </form>
      </div>
      </div>
   
  );
}
export default EditSubscription;


