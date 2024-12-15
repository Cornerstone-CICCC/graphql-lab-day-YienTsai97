import { Order } from "../models/order.model"

export type IOrder = {
    id: string,
    productId: string,
    customerId: string,
}


// getOrders
const getOrders = async () => {
    const orders = await Order.find()
    return orders
}

// createOrder(productId, customerId)
const createOrder = async (productId: string, customerId: string) => {
    const newOrder = new Order({
        productId: productId,
        customerId: customerId,
    })
    return await newOrder.save()
}

// updateOrder(id, data)
const updateOrder = async (id: string, data: Partial<IOrder>) => {
    const order = await Order.findByIdAndUpdate(id, data, { new: true })
    return order
}

// deleteOrder(id)
const deleteOrder = async (id: string) => {
    const order = await Order.findByIdAndDelete(id)
    return order
}

//
const getCustomersByProductId = async (id: string) => {
    const orders = await Order.find({ productId: id })
    return orders
}

//
const getProductsByCustomerId = async (id: string) => {
    const orders = await Order.find({ customerId: id })
    return orders
}

export default {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getCustomersByProductId,
    getProductsByCustomerId
}