import { Response } from "express";

// Middleware : Error Response Handling
const errorResponseMW = (res: Response, statusCode: number, message: string) => {

    res.status(statusCode).json({
        success: false,
        message
    });
}

export default errorResponseMW;