const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors")({ origin: true });
const mpesaRoutes = require("./mpesa/mpesaRoutes");

const app = express();
app.use(cors);
app.use(mpesaRoutes);

// Initialize firebase to access its services
admin.initializeApp(functions.config().firebase);

// Export the Express.js app as an HTTPS function
exports.api = functions.https.onRequest(app);

// const bodyParser = require("body-parser");

// Initialize Database & Collection
// const db = admin.firestore();
// const paymentsRef = "payments";
