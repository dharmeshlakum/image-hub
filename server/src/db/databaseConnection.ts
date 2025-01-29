import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Enable to use The Envirnment Veriables

// Connection String
const protocol = process.env.DB_PROTOCOL || "";
const username = process.env.DB_USERNAME || "";
const password = process.env.DB_PASSWORD || "";
const url = process.env.DB_URL || "";
const name = process.env.DB_NAME || "";
const connectionString = protocol + "://" + username + ":" + password + "@" + url + "/" + name;

// Database Connection 
const connection = mongoose.connect(connectionString).then(() => {
    console.log("Database connected successfully !");

}).catch((error: Error) => {
    console.log("Database connection error :", error.message);
});