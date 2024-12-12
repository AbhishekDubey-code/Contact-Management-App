const express = require("express");
const errorHandler = require("./middleware/errorHandler");
// const { connect } = require("mongoose");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
//const port = 3000;
const port =process.env.PORT||3000

app.use(express.json());
// app.get("/api/contacts",(req,res)=>{
//     res.status(200).json({message:"hello world!"});
// }); for not using /api/contacts again we write below code

app.use("/api/contacts", require("./route/contactRoutes"))
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})