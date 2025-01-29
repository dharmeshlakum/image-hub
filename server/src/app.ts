import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*"
}));

// Routes

app.listen(port, ()=>{
    console.log("server is running at port :", port)
});