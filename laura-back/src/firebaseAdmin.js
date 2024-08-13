
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAcountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://academialv-5f05b.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
