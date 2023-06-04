const transactionModel = require("../models/transaction.models");
const hospitalModel = require("../models/hospital_cash.models");
const { errorHandler } = require("../helpers/dbErrorHandling.js");
const axios = require("axios");

exports.createTransaction = async (req, res) => {
  const { pengeluaran, pemasukan, instansi, dokter_id, obat_id, deskripsi } =
    req.body;

  try {
    let hospital_id = process.env.RUMAH_SAKIT_ID;
    console.log(hospital_id);

    // Create a new transaction using the transactionModel
    const transaction = new transactionModel({
      pengeluaran,
      pemasukan,
      instansi,
      dokter_id,
      obat_id,
      deskripsi,
      hospital_id,
    });

    await transaction.save((err, usesr) => {
      if (err) {
        console.log("Save error", errorHandler(err));
        return res.status(401).json({
          errors: errorHandler(err),
        });
      }
    });

    const hospital = await hospitalModel.findOne({
      _id: process.env.RUMAH_SAKIT_ID,
    });

    if (!hospital) {
      return res.status(400).json({
        error: "RS tidak ditemukan",
      });
    }
    //saving the data
    hospital.saldo = hospital.saldo + pemasukan;

    await hospital.save((err, usesr) => {
      if (err) {
        console.log("Save error", errorHandler(err));
        return res.status(401).json({
          errors: errorHandler(err),
        });
      }
    });

    return res.json({
      success: true,
      message: "Transaksi terekam dan tersimpan di database",
    });
  } catch (err) {
    console.log("Save error", errorHandler(err));
    return res.status(401).json({
      errors: errorHandler(err),
    });
  }
};
exports.readdAllTransaction = async (req, res) => {
  try {
    let hospital_id = process.env.RUMAH_SAKIT_ID;
    console.log(hospital_id);

    // Create a new transaction using the transactionModel

    const transaction = await transactionModel.find({
      hospital_id: process.env.RUMAH_SAKIT_ID,
    });

    return res.json(transaction);
  } catch (err) {
    console.log("Get Data Error", errorHandler(err));
    return res.status(401).json({
      errors: errorHandler(err),
    });
  }
};

exports.addInventSaldo = async (req, res) => {
  let hospital_id = process.env.RUMAH_SAKIT_ID;
  try {
    const hospital = await hospitalModel.findOne({
      _id: hospital_id,
    });

    const saldo = req.body.saldo;
    hospital.saldo = hospital.saldo - saldo;
    await hospital.save();

    axios
      .post(`${process.env.SERVER_INVENT_APP}/api/balances/post`, {
        balance: saldo,
      })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Server Error");
      });
  } catch (err) {
    console.log("Get Data Error", errorHandler(err));
    return res.status(401).json({
      errors: errorHandler(err),
    });
  }
};
