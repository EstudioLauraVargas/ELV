// utils/signature.js
const crypto = require('crypto');

/**
 * Genera la firma de integridad interna basada en el orderId, monto, moneda y secreto.
 * @param {string} orderId - ID de la orden.
 * @param {number} monto - Monto de la orden.
 * @param {string} moneda - Moneda de la orden.
 * @param {string} secretoIntegridad - Secreto para la firma de integridad.
 * @returns {string} - Hash generado.
 */
function generarFirmaIntegridad(orderId, monto, moneda, secretoIntegridad) {
  const cadenaConcatenada = `${orderId}${monto}${moneda}${secretoIntegridad}`;
  return crypto.createHash("sha256").update(cadenaConcatenada).digest("hex");
}

/**
 * Genera la firma SHA256 para los webhooks de Wompi.
 * @param {Object} transaction - Objeto de transacción del evento.
 * @param {Array} properties - Lista de propiedades a utilizar para la firma.
 * @param {number} timestamp - Timestamp UNIX del evento.
 * @param {string} secret - Clave secreta compartida para la firma.
 * @returns {string} - Hash generado.
 */
function generarFirmaWompi(transaction, properties, timestamp, secret) {
  // Extraer los valores de las propiedades especificadas
  const valores = properties.map(prop => {
    const keys = prop.split('.');
    return keys.reduce((obj, key) => (obj ? obj[key] : null), { transaction });
  });

  // Verificar que todos los valores existan
  if (valores.includes(null)) {
    throw new Error('Algunas propiedades necesarias para la firma están ausentes.');
  }

  // Convertir todos los valores a string para evitar problemas de concatenación
  const valoresString = valores.map(valor => String(valor));

  // Concatenar los valores sin separadores, seguido del timestamp y el secreto
  const cadenaConcatenada = valoresString.join('') + timestamp + secret;

  // Generar SHA256
  return crypto.createHash('sha256').update(cadenaConcatenada).digest('hex');
}

module.exports = {
  generarFirmaIntegridad,
  generarFirmaWompi
};
