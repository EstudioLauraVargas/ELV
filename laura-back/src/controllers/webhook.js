const crypto = require('crypto');
const { OrderCompra } = require("../data");

module.exports = async (req, res) => {
  try {
    console.log("----- Webhook Event Received -----");
    console.log("Headers:", req.headers);
    console.log("Raw Body:", req.rawBody); // El cuerpo sin procesar de la petición (útil para calcular el hash)
    console.log("Parsed Body:", req.body);  // El cuerpo ya parseado de la petición

    // 1. Obtener la firma de los headers
    const signature = req.headers['x-event-checksum'];
    if (!signature) {
      console.warn("Falta el header 'x-event-checksum'");
      return res.status(400).json({ error: 'Missing signature header' });
    }

    // 2. Obtener la clave secreta desde variables de entorno
    const secret = process.env.WOMPI_INTEGRITY_SECRET;
    if (!secret) {
      console.error("WOMPI_INTEGRITY_SECRET no está configurado.");
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // 3. Verificar que req.rawBody esté disponible para calcular el hash
    if (!req.rawBody) {
      console.error("El cuerpo sin procesar (rawBody) no está disponible.");
      return res.status(500).json({ error: 'Invalid request body' });
    }

    // 4. Calcular la firma utilizando HMAC-SHA256
    const calculatedHash = crypto.createHmac('sha256', secret)
                                 .update(req.rawBody)
                                 .digest('hex');

    console.log("Hash calculado:", calculatedHash);
    console.log("Firma recibida:", signature);

    // 5. Comparar el hash calculado con el hash recibido en el header
    if (calculatedHash !== signature) {
      console.warn("Firma inválida. Hash calculado:", calculatedHash, "Firma recibida:", signature);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // 6. Procesar el evento si la firma es válida
    const { event, data } = req.body;
    console.log("Tipo de evento:", event);
    console.log("Datos del evento:", data);

    if (event !== 'transaction.updated') {
      console.warn("Tipo de evento desconocido:", event);
      return res.status(400).json({ error: 'Unknown event type' });
    }

    // 7. Verificar los datos de la transacción y el ID de la orden
    const transaction = data.transaction;
    if (!transaction || !transaction.orderId) {
      console.warn("Datos de transacción inválidos:", transaction);
      return res.status(400).json({ error: 'Invalid transaction data' });
    }

    // 8. Buscar la orden en la base de datos usando el orderId
    const orderCompra = await OrderCompra.findOne({
      where: { integritySignature: transaction.orderId }
    });

    if (!orderCompra) {
      console.warn("Orden no encontrada para orderId:", transaction.orderId);
      return res.status(404).json({ error: 'Order not found' });
    }

    // 9. Actualizar el estado de la orden basado en el estado de la transacción
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
        console.warn(`Estado de transacción desconocido: ${transaction.status}`);
        return res.status(400).json({ error: `Unknown transaction status: ${transaction.status}` });
    }

    await orderCompra.save();

    console.log("Orden actualizada exitosamente:", orderCompra);
    return res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error("Error manejando el webhook:", error);
    return res.status(500).json({ error: error.message });
  }
};





