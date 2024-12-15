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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
// Finish the resolvers
exports.resolvers = {
    Query: {
        products: () => __awaiter(void 0, void 0, void 0, function* () { return yield product_controller_1.default.getProducts(); }),
        customers: () => __awaiter(void 0, void 0, void 0, function* () {
            const customers = yield customer_controller_1.default.getCustomers();
            return customers;
        }),
        orders: () => __awaiter(void 0, void 0, void 0, function* () { return order_controller_1.default.getOrders(); }),
        getProductById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield product_controller_1.default.getProductById(id); }),
        getCustomerById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield customer_controller_1.default.getCustomerById(id); }),
    },
    Product: {
        customers: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield order_controller_1.default.getCustomersByProductId(parent.id);
            const customers = yield orders.map(order => customer_controller_1.default.getCustomerById(order.customerId.toString()));
            return customers;
        })
    },
    Customer: {
        products: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield order_controller_1.default.getProductsByCustomerId(parent.id);
            const products = orders.map(order => product_controller_1.default.getProductById(order.productId.toString()));
            return products;
        })
    },
    Order: {
        product: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const productObj = yield product_controller_1.default.getProductById(parent.productId);
            if (productObj === null) {
                order_controller_1.default.deleteOrder(parent.id);
                return null;
            }
            return productObj;
        }),
        customer: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const customerObj = yield customer_controller_1.default.getCustomerById(parent.customerId);
            if (customerObj === null) {
                order_controller_1.default.deleteOrder(parent.id);
                return null;
            }
            return customerObj;
        })
    },
    Mutation: {
        addProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { productName, productPrice }) { return yield product_controller_1.default.createProduct({ productName, productPrice }); }),
        editProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, productName, productPrice }) { return yield product_controller_1.default.updateProduct(id, { productName, productPrice }); }),
        removeProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const remove = yield product_controller_1.default.deleteProduct(id);
            if (!remove)
                return false;
            return true;
        }),
        addCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstName, lastName, email }) { return yield customer_controller_1.default.createCustomer({ firstName, lastName, email }); }),
        editCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, firstName, lastName, email }) { return yield customer_controller_1.default.updateCustomer(id, { firstName, lastName, email }); }),
        removeCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const remove = yield customer_controller_1.default.deleteCustomer(id);
            if (!remove)
                return false;
            return true;
        }),
        addOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { productId, customerId }) { return yield order_controller_1.default.createOrder(productId, customerId); }),
        editOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, productId, customerId }) { return yield order_controller_1.default.updateOrder(id, { productId, customerId }); }),
        removeOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const remove = yield order_controller_1.default.deleteOrder(id);
            if (!remove)
                return false;
            return true;
        })
    }
};
