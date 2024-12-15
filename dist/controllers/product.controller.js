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
const product_model_1 = require("../models/product.model");
// getProducts
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.Product.find();
    return products;
});
// getProductById(id)
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id);
    return product;
});
// createProduct(data)
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new product_model_1.Product(data);
    return yield newProduct.save();
});
// updateProduct(id, data)
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findByIdAndUpdate(id, data, { new: true });
    return product;
});
// deleteProduct(id)
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findByIdAndDelete(id);
    if (!product) {
        console.error("cannot delete product");
    }
    return product;
});
exports.default = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
