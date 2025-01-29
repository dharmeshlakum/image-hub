import mongoose, { Schema, model, Document } from "mongoose";

// Interface : Defines Schema Types
interface ILogin extends Document {
    user: mongoose.Schema.Types.ObjectId;
    token: string;
    userAgent: string;
    ipAddress: string;
    loginAt: Date;
}

const loginCollectionSchema = new Schema<ILogin>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    token: {
        type: String,
        required: true
    },

    userAgent: {
        type: String,
        required: true
    },

    ipAddress: {
        type: String,
        required: true
    },

    loginAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

const loginModel = model("Logins", loginCollectionSchema);
export default loginModel;