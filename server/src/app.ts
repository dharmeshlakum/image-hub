import express from "express";
import cors from "cors";
import authRouter from "./routes/auth/authRouter";
import { join } from "path";

const app = express();
const port = process.env.PORT || 8000;

// Paths
const userImgPath = join(__dirname, "./assets/users");
const postImgPath = join(__dirname, "./assets/images");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*"
}));
app.use("/user/image", express.static(userImgPath));
app.use("/post/image", express.static(postImgPath));

// Routes
app.use(authRouter);

app.listen(port, ()=>{
    console.log("server is running at port :", port)
});