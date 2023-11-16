const express=require('express');

const app=express();
require('dotenv').config();
const cors=require('cors');
const Transaction=require('./models/Transactions.js');
const  mongoose  = require('mongoose');
//importing the transaction 
app.use(cors());
app.use(express.json());//used to grab hold of the json api being fetched in from the api 

app.get('/api/test',(req,res)=>{
    res.json('test ok2');
});//route for backend testing 


app.post('/api/transaction',async (req,res)=>{
    //for conneting to db now 
    await mongoose.connect(process.env.MONGO_URL);
    //the url of the db put in the config file
    const {name,description,datetime,price}=req.body;
    const transaction=await Transaction.create({name,description,datetime,price});
    //new transaction object created from the db model 
    res.json(transaction);
});

//to store all the transactions to be displayed
//transactions added when add new transaction is hit
app.get('/api/transactions',async (req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions=await Transaction.find();//find all the transactions
    res.json(transactions);
});


app.listen(4000);//server 

//n8KsriT9QHppz2wr(password)
