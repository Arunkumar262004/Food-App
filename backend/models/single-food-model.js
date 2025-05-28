import mongoose from 'mongoose'


const single_order = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
});


const Single_order_book = mongoose.model('single-product',single_order);

export default Single_order_book;