import mongoose, { Schema, model, Document } from "mongoose";

// Interface : Defines Schema Types
interface ISavePost extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    posts: mongoose.Schema.Types.ObjectId[];
    createdAt: Date
}

const savedPostCollectionSchema = new Schema<ISavePost>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    }],

    createdAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

const savePostModel = model("SavedPost", savedPostCollectionSchema);
export default savePostModel;