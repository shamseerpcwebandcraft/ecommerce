

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the user document
interface ProductsDocument extends Document {
    name: string;
    image: string;
    stock: number;
    price: number;
    is_active: boolean
}

// Define the schema for the user document
const productsSchema: Schema<ProductsDocument> = new Schema({
    name: String,
    image: String,
    stock: Number,
    price: Number,
    is_active: Boolean

});

// Define the model for the user document
const ProductsModel: Model<ProductsDocument> = mongoose.model<ProductsDocument>('Products', productsSchema);

export default ProductsModel;