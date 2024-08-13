// paymentService.js

const axios = require('axios');

const createWompiTransaction = async (amountInCents, currency, email) => {
  const response = await axios.post('https://sandbox.wompi.co/v1/transactions', {
    amount_in_cents: amountInCents,
    currency: currency,
    customer_email: email,
    payment_method: {
      type: 'CARD',
      token: 'your-card-token', // Obtén esto desde el frontend
    },
  }, {
    headers: {
      Authorization: `Bearer ${'your-wompi-public-key'}`
    }
  });

  return response.data;
};

module.exports = { createWompiTransaction };

