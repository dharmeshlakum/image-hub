import { Request, Response, NextFunction } from "express";
import userModel, { Iusers } from "../../models/user/userCollection";
import errorResponseMW from "../error/errorResponse";

// Interface : Implement Additional Data
interface CustomRequest extends Request {
    user?: Iusers;
}

// Middleware : Username validation
const usernameValidationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const { username } = req.params;
        const user = await userModel.findOne({ username });

        // Check That Username is valid or not
        if (!user) {
            errorResponseMW(res, 404, `no data found for the user ${username}`);
            return;
        }
        req.user = user;
        next(); // move to the next middleware

    } catch (error) {
        console.log("Username validation error :", error);
        errorResponseMW(res, 500, "Internal server error !");
    }
}

export default usernameValidationMW;