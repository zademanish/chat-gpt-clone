import express from "express";
const app = express();
import aiRouter from "./routes/aiRoutes.js"
import dotenv from "dotenv";
import cors from 'cors';

app.use(cors());
dotenv.config({});
app.use(express.json());


app.use("/ai",aiRouter);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("server is listening",process.env.PORT);
})
