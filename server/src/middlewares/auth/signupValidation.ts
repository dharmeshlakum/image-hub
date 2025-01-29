import { Request, Response, NextFunction } from "express";
import userModel from "../../models/user/userCollection";
import { passwordVlidationFN } from "../../services/password/passwordServices";
import errorResponseMW from "../error/errorResponse";

// Middleware : Signup Validation
const signupValidationMW = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { emailAddress, password, fullName, username } = req.body;
        const regEx = /@gmail\.com$/

        // check That All Data Is Coming From The Client Side
        if (!emailAddress || !fullName || !password || !username) {
            errorResponseMW(res, 400, "ALl fields are required !");
            return;
        }

        // Check That Password Is Valid
        const passValidation = passwordVlidationFN(password);
        if (!passValidation.isValid) {
            errorResponseMW(res, 400, passValidation.message);
            return;
        }

        // check That Email Is Valid
        if (!regEx.test(emailAddress)) {
            errorResponseMW(res, 400, "Invalid email address !");
            return;
        }

        // Check That Username is awailable
        const usernameData = await userModel.findOne({ username });
        if (usernameData) {
            errorResponseMW(res, 400, "Username is not awailable !");
            return;
        }

        // Check That Email Address Is Not Registred 
        const emailData = await userModel.findOne({ emailAddress });
        if (emailData) {
            errorResponseMW(res, 409, "Email address is already registred !");
            return;
        }

        next();

    } catch (error: any) {
        console.log("Signup validation middleware error :", error);
        errorResponseMW(res, 500, "Internal server error !")
    }
}

export default signupValidationMW;