exports.createTransaction = async (req, res) => {
    const {
      pengeluaran,
      pemasukan,
      instansi,
      dokter_id,
      obat_id,
      deskripsi,
      hospital_id,
    } = req.body;
  
    try {
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
  
      await transaction.save(); // Save the transaction using await
  
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