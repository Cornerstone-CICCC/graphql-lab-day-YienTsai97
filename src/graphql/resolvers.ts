import productController, { IProduct } from "../controllers/product.controller"
import customerController, { ICustomer } from "../controllers/customer.controller"
import orderController, { IOrder } from "../controllers/order.controller"

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => { return await productController.getProducts() },
    customers: async () => {
      const customers = await customerController.getCustomers()
      return customers
    },
    orders: async () => { return orderController.getOrders() },
    getProductById: async (_: unknown, { id }: { id: string }) => { return await productController.getProductById(id) },
    getCustomerById: async (_: unknown, { id }: { id: string }) => { return await customerController.getCustomerById(id) },
  },
  Product: {
    customers: async (parent: { id: string }) => {
      const orders = await orderController.getCustomersByProductId(parent.id)
      const customers = await orders.map(order => customerController.getCustomerById(order.customerId.toString()))
      return customers;
    }
  },
  Customer: {
    products: async (parent: { id: string }) => {
      const orders = await orderController.getProductsByCustomerId(parent.id);
      const products = orders.map(order => productController.getProductById(order.productId.toString()));
      return products;

    }
  },
  Order: {
    product: async (parent: { id: string, productId: string }) => {
      const productObj = await productController.getProductById(parent.productId)
      if (productObj === null) {
        orderController.deleteOrder(parent.id)
        return null
      }
      return productObj
    },
    customer: async (parent: { id: string, customerId: string }) => {
      const customerObj = await customerController.getCustomerById(parent.customerId)
      if (customerObj === null) {
        orderController.deleteOrder(parent.id)
        return null
      }
      return customerObj
    }
  },
  Mutation: {
    addProduct: async (_: unknown, { productName, productPrice }: Omit<IProduct, "id">) => { return await productController.createProduct({ productName, productPrice }) },
    editProduct: async (_: unknown, { id, productName, productPrice }: IProduct) => { return await productController.updateProduct(id, { productName, productPrice }) },
    removeProduct: async (_: unknown, { id }: { id: string }) => {
      const remove = await productController.deleteProduct(id)
      if (!remove) return false
      return true
    },

    addCustomer: async (_: unknown, { firstName, lastName, email }: Omit<ICustomer, "id">) => { return await customerController.createCustomer({ firstName, lastName, email }) },
    editCustomer: async (_: unknown, { id, firstName, lastName, email }: ICustomer) => { return await customerController.updateCustomer(id, { firstName, lastName, email }) },
    removeCustomer: async (_: unknown, { id }: { id: string }) => {
      const remove = await customerController.deleteCustomer(id)
      if (!remove) return false
      return true
    },

    addOrder: async (_: unknown, { productId, customerId }: Omit<IOrder, "id">) => { return await orderController.createOrder(productId, customerId) },
    editOrder: async (_: unknown, { id, productId, customerId }: IOrder) => { return await orderController.updateOrder(id, { productId, customerId }) },
    removeOrder: async (_: unknown, { id }: { id: string }) => {
      const remove = await orderController.deleteOrder(id)
      if (!remove) return false
      return true
    }
  }
}
