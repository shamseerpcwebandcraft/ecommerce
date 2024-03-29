

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the user document
interface UserDocument extends Document {
    phone_number: number;
    otp: number;
    roles: string;
    expiration_time:Date
}

// Define the schema for the user document
const userSchema: Schema<UserDocument> = new Schema({
    phone_number: Number,
    otp: Number,
    roles: { type: String, default: 'user' },
    expiration_time:Date
});

// Define the model for the user document
const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
