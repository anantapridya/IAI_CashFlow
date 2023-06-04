const express = require('express')
const router = express.Router()

//Validation


//Load controllers
const{
createTransaction,readdAllTransaction

} = require('../controllers/transaction.controllers');

router.post('/create',createTransaction);
router.get('/read',readdAllTransaction);




module.exports=router