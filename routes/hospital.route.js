const express = require("express");
const router = express.Router();

//Validation

//Load controllers
const { readDetailHospital } = require("../controllers/hospital.controllers");

router.get("/read", readDetailHospital);

module.exports = router;
