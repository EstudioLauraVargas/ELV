// webhook.js
const crypto = require('crypto');
const { OrderCompra } = require("../data");

module.exports = async (req, res) => {
  try {
    // Logs para depuración
    console.log("----- Webhook Event Received -----");
    console.log("Headers:", req.headers);
    console.log("Raw Body:", req.rawBody);
    console.log("Parsed Body:", req.body);

    // Obtener la firma de los headers
    const signature = req.headers['wompi-signature'];
    if (!signature) {
      console.warn("Falta el header 'wompi-signature'");
      return res.status(400).json({ error: 'Missing signature header' });
    }

    // Obtener la clave secreta de Wompi desde las variables de entorno
    const secret = process.env.WOMPI_INTEGRITY_SECRET;
    if (!secret) {
      console.error("WOMPI_INTEGRITY_SECRET no está configurado en las variables de entorno.");
      return res.status(500).json({ error: 'Server configuration error' });
    }

    //Verificar la firma
    const hash = crypto.createHmac('sha256', secret)
                       .update(req.rawBody)
                       .digest('hex');

    if (hash !== signature) {
      console.warn("Firma inválida. Hash calculado:", hash, "Firma recibida:", signature);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { event, data } = req.body;

    console.log("Tipo de evento:", event);
    console.log("Datos del evento:", data);

    if (event !== 'transaction.updated') {
      console.warn("Tipo de evento desconocido:", event);
      return res.status(400).json({ error: 'Unknown event' });
    }

    // Verifica si existe la transacción y el ID de la orden
    const transaction = data.transaction;
    if (!transaction || !transaction.id_orderCompra) {
      console.warn("Datos de transacción inválidos:", transaction);
      return res.status(400).json({ error: 'Invalid transaction data' });
    }
    
    const orderCompra = await OrderCompra.findOne({
      where: { integritySignature: transaction.id_orderCompra }
    });

    if (!orderCompra) {
      console.warn("Orden no encontrada para id_orderCompra:", transaction.id_orderCompra);
      return res.status(404).json({ error: 'Order not found' });
    }

    // Actualizar el estado de la orden basado en el estado de la transacción
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
      default:
        console.warn("Estado de transacción desconocido:", transaction.status);
        return res.status(400).json({ error: `Unknown transaction status: ${transaction.status}` });
    }

    await orderCompra.save();

    console.log("Orden actualizada exitosamente:", orderCompra);
    return res.status(200).json({ message: 'Order updated' });
  } catch (error) {
    console.error("Error manejando el webhook:", error);
    return res.status(500).json({ error: error.message });
  }
};





