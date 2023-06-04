const hospitalModel = require("../models/hospital_cash.models");
const { errorHandler } = require("../helpers/dbErrorHandling.js");

exports.readDetailHospital = async (req, res) => {
  try {
    // Create a new transaction using the transactionModel
    const hospital = await hospitalModel.findOne({
      _id: process.env.RUMAH_SAKIT_ID,
    });

    return res.json({
      hospital,
    });
  } catch (err) {
    console.log("Read Error", errorHandler(err));
    return res.status(401).json({
      errors: errorHandler(err),
    });
  }
};
