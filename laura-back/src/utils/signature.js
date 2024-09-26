const crypto = require('crypto');

/**
 * Genera la firma de integridad para la creación de una orden.
 * @param {string} id - Identificador de la orden.
 * @param {number} amountInCents - amountInCents de la transacción (en centavos).
 * @param {string} currency - currency de la transacción.
 * @param {string} secretoIntegridad - El secreto de integridad para firmar la orden.
 * @returns {string} - La firma SHA-256 generada.
 */
function generarFirmaIntegridad(id, amountInCents, currency, secretoIntegridad) {
  // Concatenar los datos para la firma
  const cadenaConcatenada = `${id}${amountInCents}${currency}${secretoIntegridad}`;
  // Generar el hash
  return crypto.createHash('sha256').update(cadenaConcatenada).digest('hex');
}

/**
 * Genera la firma de validación de Webhooks de Wompi.
 * @param {Object} transaction - Objeto de transacción recibido en el webhook.
 * @param {Array} properties - Propiedades específicas de la transacción necesarias para la firma.
 * @param {number} timestamp - Marca de tiempo del evento.
 * @param {string} secret - Secreto compartido para firmar los eventos del webhook.
 * @returns {string} - La firma SHA-256 generada.
 */
function generarFirmaWompi(transaction, properties, timestamp, secret) {
  // Agregar un console.log para verificar las propiedades
  console.log("Propiedades para la firma:", properties);

  // Extraer los valores de las propiedades especificadas
  const valores = properties.map(prop => {
    const keys = prop.split('.'); 
    return keys.reduce((obj, key) => (obj ? obj[key] : null), { transaction });
  });

  // Verificar que todos los valores existan
  if (valores.includes(null)) {
    console.error('Error: Faltan propiedades necesarias para la firma:', properties);
    throw new Error('Algunas propiedades necesarias para la firma están ausentes.');
  }

  // Convertir los valores a string, concatenar y agregar el timestamp y el secreto
  const valoresString = valores.map(valor => String(valor));
  const cadenaConcatenada = valoresString.join('') + timestamp + secret;

  // Generar el hash SHA-256
  return crypto.createHash('sha256').update(cadenaConcatenada).digest('hex');
}

module.exports = { generarFirmaIntegridad, generarFirmaWompi };
