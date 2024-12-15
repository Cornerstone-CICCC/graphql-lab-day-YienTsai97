import { Product } from "../models/product.model"

export type IProduct = {
    id: string,
    productName: string,
    productPrice: number
}


// getProducts
const getProducts = async () => {
    const products = await Product.find()
    return products
}

// getProductById(id)
const getProductById = async (id: string) => {
    const product = await Product.findById(id)
    return product
}

// createProduct(data)
const createProduct = async (data: Omit<IProduct, "id">) => {
    const newProduct = new Product(data)
    return await newProduct.save()
}

// updateProduct(id, data)
const updateProduct = async (id: string, data: Partial<IProduct>) => {
    const product = await Product.findByIdAndUpdate(id, data, { new: true })
    return product
}

// deleteProduct(id)
const deleteProduct = async (id: string) => {
    const product = await Product.findByIdAndDelete(id)
    return product
}

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}