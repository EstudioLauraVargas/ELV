const { OrderCompra, Subscription } = require("../../data");
const response = require("../../utils/response");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const secretoIntegridad = "test_integrity_VMVZ36lyoQot5DsN0fBXAmp4onT5T86G";

function generarFirmaIntegridad(orderId, monto, moneda, secretoIntegridad) {
  const cadenaConcatenada = `${orderId}${monto}${moneda}${secretoIntegridad}`;
  return crypto.createHash("sha256").update(cadenaConcatenada).digest("hex");
}

module.exports = async (req, res) => {
  try {
    const { date, amount, subscriptions, state_order, address, deliveryAddress, n_document } = req.body;

    if (!date || !amount || !subscriptions || !state_order || !address) {
      return response(res, 400, { error: "Missing Ordering Data" });
    }
    if (address === "Envio a domicilio" && !deliveryAddress) {
      return response(res, 400, { error: "Missing delivery address" });
    }

    
    const lastOrder = await OrderCompra.findOne({ order: [["createdAt", "DESC"]] });
    const lastOrderNumber = lastOrder ? lastOrder.orderId : 0;
    const referencia = `SO-${lastOrderNumber + 1}`;

    
    const integritySignature = generarFirmaIntegridad(
      referencia,
      amount * 100, 
      "COP",
      secretoIntegridad
    );

    const orderCompraData = {
      orderId: uuidv4(),
      date,
      amount,
      state_order,
      address,
      deliveryAddress: address === "Envio a domicilio" ? deliveryAddress : null,
      n_document,
      integritySignature,
    };

    const orderCompra = await OrderCompra.create(orderCompraData);

    
    const subscriptionUpdates = subscriptions.map((sub) => ({
      orderId: orderCompra.orderId,
      id_subscription: sub.id_subscription, 
      duration: sub.duration, 
    }));

    await Subscription.bulkCreate(subscriptionUpdates);

    const updatedOrderCompra = await OrderCompra.findOne({
      where: { orderId: orderCompra.orderId },
      include: {
        model: Subscription,
        as: "subscriptions",
        attributes: ["id_subscription", "duration"], 
      },
    });

    console.log("Order created:", updatedOrderCompra);
    return response(res, 201, { orderCompra: updatedOrderCompra });
  } catch (error) {
    console.error("Error creating orderCompra:", error);
    return response(res, 500, { error: error.message });
  }
};

