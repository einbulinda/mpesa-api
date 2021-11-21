const express = require("express");
const {
  mpesaPassword,
  token,
  stkPush,
  confirmations,
} = require("./mpesaController");

const router = express.Router();

router.get("/password", mpesaPassword);
router.post("/stk-push", token, stkPush);
router.post("/confirmation", confirmations);

module.exports = router;
