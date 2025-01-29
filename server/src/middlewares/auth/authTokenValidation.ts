import { Request, Response, NextFunction } from "express";
import { tokenVerificationFN } from "../../services/token/tokenServices";
import loginModel from "../../models/login/loginCollection";
import { JwtPayload } from "jsonwebtoken";
import errorResponseMW from "../error/errorResponse";

// Interface : Implement Additional Data To The Request
interface CustomRequest extends Request {
    token?: JwtPayload;
}

// Middleware : Token Verification
const authTokenVerificationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        // Extract Token From The Request
        const token = req.header("auth-token");
        if (!token) {
            errorResponseMW(res, 401, "Token is not awailable !");
            return;
        }

        // Verify Token
        const verification = tokenVerificationFN(token);
        if (verification.isValid && verification.token) {

            // Check That Token Is Not Expired
            const { id, exp } = verification.token;
            if (exp && exp * 1000 > Date.now()) {

                // Check The Login Data
                const loginData = await loginModel.findOne({ user: id });
                if (!loginData) {
                    errorResponseMW(res, 401, "Unauthorized token !");
                    return;
                }

                req.token = verification.token;
                next(); // move to the next middleware

            } else {
                errorResponseMW(res, 401, "Token is expired !");
                return;
            }

        } else {
            errorResponseMW(res, 401, "Token is not awailable !");
            return;
        }

    } catch (error: any) {
        console.log("Auth token verification middleware error :", error);
        errorResponseMW(res, 500, "Internal server error !");
    }
}

export default authTokenVerificationMW;