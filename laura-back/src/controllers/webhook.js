const crypto = require('crypto');
const { OrderCompra } = require("../../data"); // Ajusta la ruta según tu estructura de proyecto

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const signature = req.headers['wompi-signature'];
    if (!signature) {
      console.warn("Falta el encabezado de firma.");
      return res.status(400).json({ error: 'Missing signature header' });
    }

    const secret = process.env.WOMPI_INTEGRITY_SECRET;
    if (!secret) {
      console.error("WOMPI_INTEGRITY_SECRET no está configurado en las variables de entorno.");
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Para capturar el cuerpo crudo en Vercel, necesitas configurar la función para recibir el cuerpo como buffer
    const bodyBuffer = await buffer(req);
    const hash = crypto.createHmac('sha256', secret)
                       .update(bodyBuffer)
                       .digest('hex');

    if (hash !== signature) {
      console.warn("Firma inválida. Hash calculado:", hash, "Firma recibida:", signature);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const body = JSON.parse(bodyBuffer.toString());

    const { event, data } = body;

    console.log("Evento recibido:", event);

    if (event !== 'transaction.updated') {
      console.warn(`Evento desconocido: ${event}`);
      return res.status(400).json({ error: 'Unknown event' });
    }

    const transaction = data.transaction;
    if (!transaction || !transaction.reference) {
      console.warn("Datos de transacción inválidos:", transaction);
      return res.status(400).json({ error: 'Invalid transaction data' });
    }

    console.log("Datos de la transacción:", transaction);

    const orderCompra = await OrderCompra.findOne({
      where: { reference: transaction.reference }
    });

    if (!orderCompra) {
      console.warn(`Orden no encontrada para la referencia: ${transaction.reference}`);
      return res.status(404).json({ error: 'Order not found' });
    }

    switch (transaction.status) {
      case 'APPROVED':
        orderCompra.transaction_status = 'Aprobado';
        break;
      case 'DECLINED':
        orderCompra.transaction_status = 'Rechazado';
        break;
      case 'PENDING':
        orderCompra.transaction_status = 'Pendiente';
        break;
      case 'FAILED':
        orderCompra.transaction_status = 'Fallido';
        break;
      case 'EXPIRED':
        orderCompra.transaction_status = 'Expirado';
        break;
      default:
        console.warn(`Estado de transacción desconocido: ${transaction.status}`);
        return res.status(400).json({ error: `Unknown transaction status: ${transaction.status}` });
    }

    await orderCompra.save();

    console.log(`Orden actualizada: ${orderCompra.reference} con estado ${orderCompra.transaction_status}`);

    return res.status(200).json({ message: 'Order updated' });
  } catch (error) {
    console.error("Error manejando el webhook:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Función auxiliar para obtener el cuerpo como buffer en Vercel
import { IncomingMessage } from 'http';

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}








