import mongoose, { Schema, model, Document } from "mongoose";

// Interface : Defines Schema Types
interface ILikes extends Document {
    user: mongoose.Schema.Types.ObjectId;
    post: mongoose.Schema.Types.ObjectId;
    likedAt: Date
}

const likeCollectionSchema = new Schema<ILikes>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        required: true
    },

    likedAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

const likeModel = model("Likes", likeCollectionSchema);
export default likeModel;