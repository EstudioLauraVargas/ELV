import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PaymentDetail = () => {
    const location = useLocation();
    const { subscription } = location.state;
    const navigate = useNavigate();
    const [sdkLoaded, setSdkLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.wompi.co/widget.js";
        script.async = true;
        script.onload = () => {
            setSdkLoaded(true);
            console.log('Wompi SDK loaded');
        };
        script.onerror = () => {
            console.error('Error loading Wompi SDK');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        if (!sdkLoaded) {
            alert('Error', 'El SDK de Wompi no se ha cargado correctamente.', 'error');
            return;
        }

        if (typeof window.WompiCheckout === 'undefined') {
            alert('Error', 'El objeto WompiCheckout no está disponible.', 'error');
            return;
        }

        try {
            const checkout = new WidgetCheckout({
                publicKey: 'pub_test_udFLMPgs8mDyKqs5bRCWhpwDhj2rGgFw', // Reemplaza con tu clave pública de Wompi
                currency: 'COP',
                amountInCents: subscription.price * 100,
                reference: `${subscription.idSub}-${Date.now()}`, // Un identificador único para la transacción
                redirectUrl: 'https://tu-sitio.com/confirmacion-de-pago', // URL de redirección después del pago
            });

            checkout.open((result) => {
                const transaction = result.transaction;
                if (transaction.status === 'APPROVED') {
                    alert('Success', 'Pago exitoso', 'success');
                } else {
                    alert('Error', 'El pago no se completó', 'error');
                }
            });
        } catch (error) {
            alert('Error', 'Hubo un problema al procesar el pago.', 'error');
            console.error('Payment processing error:', error);
        }
    };

    const handleGoToPanel = () => {
        navigate("/panel");
      };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Detalles de la Suscripción</h1>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{subscription.typeSub}</h2>
                <p className="mb-2">Duración: {subscription.durationDays} días</p>
                <p className="mb-2">Precio: ${subscription.price.toFixed(2)}</p>
                <button
                    onClick={handlePayment}
                    className="bg-gray-600 text-white px-4 py-2 rounded mt-4"
                    disabled={!sdkLoaded}
                >
                    Realizar Pago
                </button>
                <button
    onClick={handleGoToPanel}
    className="bg-pink-500 text-white px-4 py-2 rounded ml-8"
  >
    Ir a Panel
  </button>
            </div>
        </div>
    );
};

export default PaymentDetail;





