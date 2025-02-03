import { Request, Response, NextFunction } from "express";
import postModel, { IPosts } from "../../models/post/postCollection";
import errorResponseMW from "../error/errorResponse";

// Interface : Implement Additional Data To Request
interface CustomRequest extends Request {
    post?: IPosts;
}

// Middleware : Post Id Validation
const postIdValidationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const { postId } = req.params;
        const post = await postModel.findOne({ _id: postId });

        // Check That Post Id Is Valid Or Not
        if (!post) {
            errorResponseMW(res, 404, "No Data Found !");
            return;
        }

        req.post = post;
        next(); // move to the next middleware

    } catch (error: any) {
        console.log("post id validation error :", error);
        errorResponseMW(res, 500, "Internal server error !");
    }
}

export default postIdValidationMW;