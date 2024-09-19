import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentConfirmation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const paymentStatus = queryParams.get('status');

    if (paymentStatus === 'APPROVED') {
      alert('Pago aprobado');
      // Aquí puedes actualizar el estado del usuario o redirigirlo a otra página
    } else {
      alert('El pago ha fallado o fue cancelado');
    }
  }, [queryParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Confirmación de Pago</h1>
        <p className="text-lg">Estamos verificando el estado de tu pago...</p>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
