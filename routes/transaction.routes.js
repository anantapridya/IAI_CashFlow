const express = require("express");
const router = express.Router();

//Validation

//Load controllers
const {
  createTransaction,
  readdAllTransaction,
  addInventSaldo,
} = require("../controllers/transaction.controllers");

router.post("/create", createTransaction);
router.get("/read", readdAllTransaction);
router.post("/add/saldo", addInventSaldo);

module.exports = router;
