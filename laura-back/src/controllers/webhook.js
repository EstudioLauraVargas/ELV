const crypto = require('crypto');
const { OrderCompra } = require("../data");

module.exports = async (req, res) => {
  try {
    const signature = req.headers['wompi-signature'];
    if (!signature) {
      return res.status(400).json({ error: 'Missing signature header' });
    }

    const secret = process.env.WOMPI_INTEGRITY_SECRET;
    if (!secret) {
      console.error("WOMPI_SECRET no está configurado en las variables de entorno.");
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Utilizar el cuerpo crudo para la verificación de la firma
    const hash = crypto.createHmac('sha256', secret)
                       .update(req.rawBody)
                       .digest('hex');

    if (hash !== signature) {
      console.warn("Firma inválida. Hash calculado:", hash, "Firma recibida:", signature);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { event, data } = req.body;

    if (event !== 'transaction.updated') {
      return res.status(400).json({ error: 'Unknown event' });
    }

    // Verifica si existe la transacción y el ID de la orden
    const transaction = data.transaction;
    if (!transaction || !transaction.id_orderCompra) {
      return res.status(400).json({ error: 'Invalid transaction data' });
    }
    
    const orderCompra = await OrderCompra.findOne({
      where: { integritySignature: transaction.id_orderCompra }
    });

    if (!orderCompra) {
      return res.status(404).json({ error: 'Order not found' });
    }

    switch (transaction.status) {
      case 'APPROVED':
        orderCompra.transaction_status = 'Aprobado'; // Cambia el estado a 'Aprobado'
        break;
      case 'DECLINED':
        orderCompra.transaction_status = 'Rechazado'; // Cambia el estado a 'Rechazado'
        break;
      case 'PENDING':
        orderCompra.transaction_status = 'Pendiente'; // Cambia el estado a 'Pendiente'
        break;
      default:
        return res.status(400).json({ error: `Unknown transaction status: ${transaction.status}` });
    }

    await orderCompra.save();

    return res.status(200).json({ message: 'Order updated' });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ error: error.message });
  }
};




