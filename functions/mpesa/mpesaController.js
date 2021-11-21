require("dotenv").config();
const datetime = require("node-datetime");
const axios = require("axios").default;

const passKey = process.env.PASSKEY;
const shortCode = process.env.SHORT_CODE;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

// M-Pesa datetime format
const formatted = datetime.create().format("YmdHMS");

const newPassword = () => {
  // Get password String
  const passString = shortCode + passKey + formatted;
  // Convert to base 64 format
  const base64Encoded = Buffer.from(passString).toString("base64");

  return base64Encoded;
};

exports.mpesaPassword = (req, res) => {
  res.send(newPassword());
};

// Token generation for STK Push.
exports.token = (req, res, next) => {
  const endpointUrl = process.env.AUTH_URL;

  const auth = `Basic ${Buffer.from(
    consumerKey + ":" + consumerSecret
  ).toString("base64")}`;

  // Define Axios Headers
  const headers = {
    Authorization: auth,
  };

  axios
    .get(endpointUrl, { headers: headers })
    .then((response) => {
      let data = response.data;
      let token = data.access_token;
      req.token = token;
      // console.log(token);
      // res.send(token);
      next();
    })
    .catch((error) => console.log(error));
};

exports.stkPush = (req, res) => {
  const token = req.token;

  const headers = { Authorization: "Bearer " + token };
  const stkURL = process.env.STK_URL;

  let data = {
    BusinessShortCode: 174379,
    Password: newPassword(),
    Timestamp: formatted,
    TransactionType: "CustomerPayBillOnline",
    Amount: 1,
    PartyA: 254702688826,
    PartyB: 174379,
    PhoneNumber: 254702688826,
    CallBackURL: `${process.env.BASE_URL}/api/confirmation`,
    AccountReference: "House of Glamour",
    TransactionDesc: "Lipa na Mpesa",
  };

  axios.post(stkURL, data, { headers: headers }).then((response) => {
    res.send(response.data);
  });
};

exports.confirmations = (req, res) => {
  console.log("..............Confirmation.................");
  console.log(req.body);
  res.send("Confirmed");
};
