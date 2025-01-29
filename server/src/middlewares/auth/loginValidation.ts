import { Request, Response, NextFunction } from "express";
import userModel, { Iusers } from "../../models/user/userCollection";
import { passwordVerificationFN } from "../../services/password/passwordServices";
import loginModel from "../../models/login/loginCollection";
import errorResponseMW from "../error/errorResponse";
import { getClientInfoFN } from "../../services/request/getClientInfo";
import { generateTokenFN } from "../../services/token/tokenServices";

// Interface : Implement Additional Data To The Request
interface CustomRequest extends Request {
    user?: Iusers;
}

const loginValidationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        // Check That All Data Coming From The Client Side
        const { userInput, password } = req.body;
        if (!userInput || !password) {
            errorResponseMW(res, 400, "All fields are required !");
            return;
        }

        // Check For The User
        const user = await userModel.findOne({
            $or: [
                { username: userInput, isDeleted: false },
                { emailAddress: userInput, isDeleted: false }
            ]
        });
        if (!user) {
            errorResponseMW(res, 400, "Invalid email address | username");
            return;
        }

        // Check That Password Is Correct Or Not
        const passverification = await passwordVerificationFN(password, user.password);
        if (!passverification) {
            errorResponseMW(res, 401, "Invalid password !");
            return;
        }

        // Check For The Previous Login Data
        const loginData = await loginModel.findOne({ user: user._id });

        if (loginData) {
            const clientInfo = getClientInfoFN(req);

            if (loginData.ipAddress === clientInfo.ipAddress && loginData.userAgent === clientInfo.userAgent) {
                const token = generateTokenFN({
                    username: user.username,
                    userId: user._id
                });

                // Update The Login Details
                await loginModel.updateOne({ _id: loginData._id }, {
                    $set: {
                        token,
                        loginAt: Date.now()
                    }
                });

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

            } else {
                errorResponseMW(res, 409, "User is already login on other device !");
                return;
            }

        } else {
            req.user = user;
            next(); // move to the next middleware
        }

    } catch (error: any) {
        console.log("login validation middleware error :", error);
        errorResponseMW(res, 500, "Internal server error !")
    }
}

export default loginValidationMW;