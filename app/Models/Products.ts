

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the user document
interface ProductsDocument extends Document {
    product_name: string;
    quantity: number;
    price: number;
    image: string;

}

// Define the schema for the user document
const productsSchema: Schema<ProductsDocument> = new Schema({
    product_name: String,
    quantity: Number,
    price: Number,
    image: String

});

// Define the model for the user document
const ProductsModel: Model<ProductsDocument> = mongoose.model<ProductsDocument>('Products', productsSchema);

export default ProductsModel;