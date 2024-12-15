"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
// getOrders
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find();
    return orders;
});
// createOrder(productId, customerId)
const createOrder = (productId, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new order_model_1.Order({
        productId: productId,
        customerId: customerId,
    });
    return yield newOrder.save();
});
// updateOrder(id, data)
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findByIdAndUpdate(id, data, { new: true });
    return order;
});
// deleteOrder(id)
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findByIdAndDelete(id);
    return order;
});
//
const getCustomersByProductId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find({ productId: id });
    return orders;
});
//
const getProductsByCustomerId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find({ customerId: id });
    return orders;
});
exports.default = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getCustomersByProductId,
    getProductsByCustomerId
};
