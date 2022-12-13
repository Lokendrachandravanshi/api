
const express = require('express')
const app = express();
require('./db/dbconnection');
const userRouter = require('./routes/userRouter');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/app/v1/user",userRouter);

app.listen(7000,()=>{
    console.log("server is running on 7000");
})

