import mongoose from 'mongoose';
import Order from './order';

const OrderSchema = Order.schema;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    orders: {
        type: [OrderSchema],
    },
})

export default mongoose.model('User', userSchema);