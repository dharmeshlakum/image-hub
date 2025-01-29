import express, { Request, Response } from "express";
import userModel, { Iusers } from "../../models/user/userCollection";
import { generateTokenFN } from "../../services/token/tokenServices";
import signupValidationMW from "../../middlewares/auth/signupValidation";
import errorResponseMW from "../../middlewares/error/errorResponse";
import { getClientInfoFN } from "../../services/request/getClientInfo";
import loginModel from "../../models/login/loginCollection";
import loginValidationMW from "../../middlewares/auth/loginValidation";
import authTokenVerificationMW from "../../middlewares/auth/authTokenValidation";
import { JwtPayload } from "jsonwebtoken";

const authRouter = express.Router();

// Interface : Extract Additional Data From The Request
interface CustomRequest extends Request {
    user?: Iusers;
    token?: JwtPayload;
}

// Signup
authRouter.post("/auth/signup", signupValidationMW, async (req: Request, res: Response) => {

    try {
        const { emailAddress, password, fullName, username } = req.body;
        // Create New User Document
        const user = new userModel({
            username,
            password,
            emailAddress,
            fullName
        });
        const saveData = await user.save();

        const token = generateTokenFN({
            username: user.username,
            id: user._id
        });
        const ClientData = getClientInfoFN(req);

        // Create New Login Document
        const loginData = new loginModel({
            user: user._id,
            token,
            userAgent: ClientData.userAgent,
            ipAddress: ClientData.ipAddress
        });
        await loginData.save();

        res.status(201).json({
            success: true,
            message: `${user.username} login successfully !`,
            token,
            user: {
                id: user._id,
                username: user.username,
                profilePicture: user.profilePicture,
                fullName: user.fullName
            }
        });

    } catch (error: any) {
        console.log("Signup api error :", error);
        errorResponseMW(res, 500, "Internal server error !");
    }
});

// Login
authRouter.post("/auth/login", loginValidationMW, async (req: CustomRequest, res: Response) => {

    try {
        // Extract User Data From The Request
        const { user } = req;
        if (!user) {
            errorResponseMW(res, 404, "Userdata not found !");
            return;
        }

        const token = generateTokenFN({
            username: user.username,
            id: user._id
        });
        const ClientData = getClientInfoFN(req);

        // Create New Login Document
        const loginData = new loginModel({
            user: user._id,
            token,
            userAgent: ClientData.userAgent,
            ipAddress: ClientData.ipAddress
        });
        await loginData.save();

        res.status(200).json({
            success: true,
            message: `${user.username} login successfully !`,
            token,
            user: {
                id: user._id,
                username: user.username,
                profilePicture: user.profilePicture,
                fullName: user.fullName
            }
        });

    } catch (error: any) {
        console.log("Login api error :", error);
        errorResponseMW(res, 500, "Internal server error !");
    }
});

// Logout
authRouter.post("/auth/logout", authTokenVerificationMW, async (req: CustomRequest, res: Response) => {

    try {
        // Extract User Data From The Request
        const { token } = req;
        if (!token) {
            errorResponseMW(res, 401, "Token not found !");
            return;
        }

        await loginModel.deleteOne({ user: token.id });
        res.status(200).json({
            success: true,
            message: token.username ? `${token.username} logout succesfully !` : "User logout successfully !"
        });

    } catch (error: any) {
        console.log("Logout api error :", error);
        errorResponseMW(res, 500, "Internal server error !");
    }
})

export default authRouter;