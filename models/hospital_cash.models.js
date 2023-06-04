const mongoose = require("mongoose");


const hospitalCashSchema = new mongoose.Schema(
  {

    
    nama_rumah_sakit :  {
      type: String,
      trim: true,
      require : true,
      lowercase: true,
    },
    saldo: {
      type: Number,
      default: 0,
    },
    pemasukan: {
      type: Number,
      default: 0,
    },
    pengeluaran: {
      type: Number,
      default: 0,
    },
    
  },

  {
    timestamps: true,
  }
);



module.exports = mongoose.model("hospital_cash_model", hospitalCashSchema);
