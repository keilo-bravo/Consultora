
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_API_PROD_ACCESS_TOKEN
});

module.exports = mercadopago;