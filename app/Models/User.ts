

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the user document
interface UserDocument extends Document {
    phone_number: number;
    otp: number;
    role: string;
    expiration_time:Date
    is_verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema for the user document
const userSchema: Schema<UserDocument> = new Schema({
    phone_number: Number,
    otp: Number,
    role: { type: String, default: 'user' },
    is_verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    expiration_time:Date
});

// Define the model for the user document
const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
