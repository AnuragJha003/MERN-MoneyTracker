//import {model,Schema} from "mongoose";
const mongoose=require('mongoose');

const {Schema,model}=mongoose;

const TransactionSchema= new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    datetime:{type:Date,required:true},
});//defining the schemma of the transaction data

const TransactionModel=model('Transaction',TransactionSchema);
//creating the model for the transaction 

module.exports=TransactionModel;
