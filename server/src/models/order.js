import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sku: {
        type: Number,
        required: true
    },
})

export default mongoose.model('Order', orderSchema);