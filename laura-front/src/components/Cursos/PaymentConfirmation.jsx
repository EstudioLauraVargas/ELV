// src/components/PaymentResult.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';
import fondo from '../../lauraassets/bg1.png'; // Asegúrate de tener este fondo o usa otro

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Extraer los parámetros de la URL
    const query = new URLSearchParams(location.search);
    const statusParam = query.get('status'); // Supongamos que Wompi envía 'status' como parámetro
    const reference = query.get('reference');

    console.log('PaymentConfirmation component mounted with status:', statusParam, 'reference:', reference);

    if (statusParam === 'APPROVED') {
      setStatus('success');
      setMessage('¡Pago aprobado exitosamente!');
      toast.success('¡Pago aprobado exitosamente!');
    } else if (statusParam === 'DECLINED') {
      setStatus('error');
      setMessage('Pago rechazado.');
      toast.error('Pago rechazado.');
    } else {
      setStatus('unknown');
      setMessage('Estado de pago desconocido.');
      toast.warn('Estado de pago desconocido.');
    }

    // Opcional: Redirigir al usuario después de cierto tiempo
    // setTimeout(() => navigate('/'), 5000);
  }, [location, navigate]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          {status === 'success' && (
            <div className="text-green-600">
              <h2 className="text-2xl font-bold mb-4">¡Pago Exitoso!</h2>
              <p>{message}</p>
            </div>
          )}
          {status === 'error' && (
            <div className="text-red-600">
              <h2 className="text-2xl font-bold mb-4">Pago Rechazado</h2>
              <p>{message}</p>
            </div>
          )}
          {status === 'unknown' && (
            <div className="text-yellow-600">
              <h2 className="text-2xl font-bold mb-4">Estado de Pago Desconocido</h2>
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;

