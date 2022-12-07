import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
dotenv.config()

const app = express();
app.use(express.json())

//middlewares
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);

mongoose.connect(
    `mongodb+srv://tobiken:${process.env.MONGODB_PASSWORD}@cluster0.ttayq5q.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => app.listen(5000,()=>
        console.log("connected to DB and Server")
        )
    )
    .catch((e)=>console.log(e));


