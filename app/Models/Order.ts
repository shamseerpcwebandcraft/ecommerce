import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the user document
interface OrdersDocument extends Document {
    user_id: string;
    items: any[]; // Or specify a more specific type for items
    total_price: number;
    user_details: object;
    delete_status: boolean;
    payment_status: string;
    payment_mode: string; // Corrected field name
    shipping_address: object; // Corrected field name
    delivered_status: string;
    shipping_charge: number;
    payable_price: number;
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema for the user document
const ordersSchema: Schema<OrdersDocument> = new Schema({
    user_id: String,
    items: Array,
    total_price: Number,
    user_details: Object,
    delete_status: Boolean,
    payment_status: String,
    payment_mode: String,
    shipping_address: Object,
    delivered_status: String,
    shipping_charge: Number,
    payable_price: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Define the model for the user document
const OrdersModel: Model<OrdersDocument> = mongoose.model<OrdersDocument>('Orders', ordersSchema);

export default OrdersModel;
