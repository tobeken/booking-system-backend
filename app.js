import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config()

const app = express();

mongoose.connect(
    `mongodb+srv://tobiken:${process.env.MONGODB_PASSWORD}@cluster0.ttayq5q.mongodb.net/?retryWrites=true&w=majority`
    ).then(() => app.listen(5000,()=>
        console.log("connected to DB and Server")
        )
    )
    .catch((e)=>console.log(e));


