import asyncHandler from 'express-async-handler'
import Order from '../models/OrderModel.js'

/* Make a new order */
// Route - POST /api/orders
const addOrder = asyncHandler(async(req, res)=>{
    const { items } = req.body
    console.log(req.user)

    if(items && items.length == 0){
        res.status(400)
        throw new Error('No items in cart')
    }else{
        res.status(201)
        const order = new Order({
            items, 
            user : req.user._id
        })
        const savedOrder = await order.save()
        res.json(savedOrder)
    }
})

/* Fetch all orders */
// Route - GET /api/orders
const getOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({})

    if(orders){
        res.status(201),
        res.json(orders)
    }else{
        res.status(404)
        throw new Error('Unable to fetch users')
    }
})


/* Fetch a specific order */
// Route - GET /api/orders/:id
const getOrderById = asyncHandler(async(req, res)=>{
    const orderId = req.params.id
    const orderFound = await Order.findById(orderId)
    console.log(`this is orderId ${orderFound}`)


    if(orderFound){
        res.status(201)
        res.json(orderFound)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

/* Delete a specific order */
// Route - DELETE /api/orders/:id

const deleteOrder = asyncHandler(async(req, res)=>{
    const orderId = req.params.id
    const orderFound = await Order.findById(orderId)

    if(orderFound){
        res.status(200)
        await Order.findByIdAndDelete(orderId)
        console.log('Order deleted')
        res.json({ message : "Order deleted"})
    }else{
        res.status(404)
        throw new Error('Unable to delete order')
    }
}) 

export { addOrder, getOrders, getOrderById, deleteOrder}