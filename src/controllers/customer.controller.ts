import { Customer } from "../models/customer.model"


export type ICustomer = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
}


// getCustomers
const getCustomers = async () => {
    return await Customer.find()

}

// getCustomerById(id)
const getCustomerById = async (id: string) => {
    const customer = await Customer.findById(id)
    return customer
}


// createCustomer(data)
const createCustomer = async (data: Omit<ICustomer, "id">) => {
    const newCustomer = new Customer(data)
    return await newCustomer.save()
}

// updateCustomer(id, data)
const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
    const customer = await Customer.findByIdAndUpdate(id, data, { new: true })
    return customer
}
// deleteCustomer(id)
const deleteCustomer = async (id: string) => {
    const customer = await Customer.findByIdAndDelete(id)
    return customer
}

export default {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}