import mongoose, { Schema, model, Document } from "mongoose";
import { passwordHashingFN } from "../../services/password/passwordServices";
import { defaultUserImgFN } from "../../services/images/defaultUserImage";

// Interface : Defines Schema Types
export interface Iusers extends Document {
    username: string;
    password: string;
    emailAddress: string;
    fullName: string;
    profilePicture: string;
    about: string;
    followings: mongoose.Schema.Types.ObjectId[];
    followers: mongoose.Schema.Types.ObjectId[];
    isDeleted: boolean;
    isVerified: boolean;
    registredAt: Date;
}

const userCollectionSchema = new Schema<Iusers>({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    emailAddress: {
        type: String,
        required: true
    },

    fullName: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String
    },

    about: {
        type: String,
        default: ""
    },

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    isDeleted: {
        type: Boolean,
        default: false
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    registredAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

// Pre Middleware
userCollectionSchema.pre("save", async function (next) {

    if (this.password) {
        const hashcode = await passwordHashingFN(this.password);
        this.password = hashcode;
    }
    this.profilePicture = defaultUserImgFN(this.username);
    next();
});

const userModel = model("Users", userCollectionSchema);
export default userModel;