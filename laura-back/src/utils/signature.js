const crypto = require('crypto');

/**
 * Genera la firma SHA256 basada en las propiedades del evento, el timestamp y el secreto.
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

module.exports = { generarFirmaWompi };