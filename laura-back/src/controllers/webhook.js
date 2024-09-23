// controllers/webhooks/wompiWebhook.js
const { OrderCompra } = require("../data");
const { generarFirmaWompi } = require("../utils/signature");
const response = require("../utils/response");

module.exports = async (req, res) => {
  try {
    console.log("----- Webhook Event Received -----");
    console.log("Headers:", req.headers);
    console.log("Raw Body:", req.rawBody);
    console.log("Parsed Body:", req.body);

    // 1. Obtener la firma del cuerpo
    const signature = req.body.signature;
    if (!signature || !signature.checksum || !signature.properties) {
      console.warn("Falta la firma en el cuerpo del evento.");
      return res.status(400).json({ error: 'Missing signature in event body' });
    }

    // 2. Obtener la clave secreta desde variables de entorno
    const secret = process.env.WOMPI_INTEGRITY_SECRET;
    if (!secret) {
      console.error("WOMPI_INTEGRITY_SECRET no está configurado.");
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // 3. Extraer las propiedades especificadas para la firma
    const properties = signature.properties;
    const transaction = req.body.data.transaction;
    const timestamp = req.body.timestamp;

    if (!transaction) {
      console.warn("Datos de transacción faltantes.");
      return res.status(400).json({ error: 'Missing transaction data' });
    }

    if (!timestamp) {
      console.warn("Timestamp faltante en el evento.");
      return res.status(400).json({ error: 'Missing timestamp in event data' });
    }

    // 4. Generar la firma calculada
    let calculatedHash;
    try {
      calculatedHash = generarFirmaWompi(transaction, properties, timestamp, secret);
    } catch (err) {
      console.warn("Error al generar la firma:", err.message);
      return res.status(400).json({ error: err.message });
    }

    console.log("Hash calculado:", calculatedHash);
    console.log("Firma recibida:", signature.checksum);

    // 5. Comparar el hash calculado con el hash recibido
    if (calculatedHash !== signature.checksum) {
      console.warn("Firma inválida. Hash calculado:", calculatedHash, "Firma recibida:", signature.checksum);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // 6. Procesar el evento si la firma es válida
    const event = req.body.event;
    console.log("Tipo de evento:", event);
    console.log("Datos del evento:", req.body.data);

    if (event !== 'transaction.updated') {
      console.warn("Tipo de evento desconocido:", event);
      return res.status(400).json({ error: 'Unknown event type' });
    }

    // 7. Verificar los datos de la transacción
    const transactionData = req.body.data.transaction;
    if (!transactionData || !transactionData.reference) { // Usamos 'reference' para buscar la orden
      console.warn("Datos de transacción inválidos:", transactionData);
      return res.status(400).json({ error: 'Invalid transaction data' });
    }

    // 8. Buscar la orden en la base de datos usando el reference (orderId)
    const orderCompra = await OrderCompra.findOne({
      where: { orderId: transactionData.reference } // Asegúrate de que 'reference' corresponde a 'orderId' en tu base de datos
    });

    if (!orderCompra) {
      console.warn("Orden no encontrada para reference:", transactionData.reference);
      return res.status(404).json({ error: 'Order not found' });
    }

    // 9. Actualizar el estado de la orden basado en el estado de la transacción
    switch (transactionData.status) {
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
        console.warn(`Estado de transacción desconocido: ${transactionData.status}`);
        return res.status(400).json({ error: `Unknown transaction status: ${transactionData.status}` });
    }

    await orderCompra.save();

    console.log("Orden actualizada exitosamente:", orderCompra);
    return res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error("Error manejando el webhook:", error);
    return res.status(500).json({ error: error.message });
  }
};






