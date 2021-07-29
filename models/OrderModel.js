import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    items : [{
        itemName : {
            type : String,
            required : true
        },
        itemQuantity : {
            type : Number,
            required : true
        },
        itemPrice : {
            type : Number,
            required : true
        }
    }]
})

const Order = mongoose.model('order', OrderSchema)

export default Order;