import mongoose, { Schema, model, Document } from "mongoose";

// Interface : Defines Schema Types
export interface IPosts extends Document {
    user: mongoose.Schema.Types.ObjectId;
    description: string;
    images: string[];
    likes: mongoose.Schema.Types.ObjectId[];
    isDeleted: boolean;
    lastUpdate: Date;
    createdAt: Date;
}

const postCollectionSchema = new Schema<IPosts>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    description: {
        type: String,
        required: true
    },

    images: {
        type: [String],
        default: []
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes"
    }],

    isDeleted: {
        type: Boolean,
        default: false
    },

    lastUpdate: {
        type: Date,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

const postModel = model("Posts", postCollectionSchema);
export default postModel;