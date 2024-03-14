import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the products document
interface CartsDocument extends Document {
    items: any[]; // Or specify a more specific type for items
    total_price: number;
    user_id:string;
    phonenumber: string;
    delete_status: boolean; // Corrected type declaration
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema for the products document
const cartsSchema: Schema<CartsDocument> = new Schema({
    items: Array,
    total_price: Number,
    phonenumber: String,
    user_id: String,
    delete_status: Boolean, // Corrected type declaration
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Define the model for the products document
const CartsModel: Model<CartsDocument> = mongoose.model<CartsDocument>('Carts', cartsSchema);

export default CartsModel;
