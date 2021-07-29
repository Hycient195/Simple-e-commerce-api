import asyncHandler from 'express-async-handler'
import Order from '../models/OrderModel.js'

const addOrder = asyncHandler(async(req, res)=>{
    const { items } = req.body

    if(items && items.length == 0){
        res.status(400)
        throw new Error('No items in cart')
    }else{
        res.status(201)
        res.json
    }
})