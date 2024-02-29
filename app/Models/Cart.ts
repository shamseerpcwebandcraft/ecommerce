import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the products document
interface ProductsDocument extends Document {
    items: any[]; // Or specify a more specific type for items
    total_price: number;
    user_id: number;
    quantity: number;
    delete_status: boolean; // Corrected type declaration
}

// Define the schema for the products document
const productsSchema: Schema<ProductsDocument> = new Schema({
    items: Array,
    total_price: Number,
    user_id: Number,
    quantity: Number,
    delete_status: Boolean // Corrected type declaration
});

// Define the model for the products document
const ProductsModel: Model<ProductsDocument> = mongoose.model<ProductsDocument>('Products', productsSchema);

export default ProductsModel;
