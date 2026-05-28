import axiosClient from "../lib/axiosClient";


// -----------------------------------
// GET ALL CUSTOMERS
// -----------------------------------
export const getCustomers = async () => {

  const response =
    await axiosClient.get(
      "/customers/"
    );

  return response.data;
};


// -----------------------------------
// CREATE CUSTOMER
// -----------------------------------
export const createCustomer = async (
  customerData
) => {

  const response =
    await axiosClient.post(

      "/customers/",

      customerData
    );

  return response.data;
};


// -----------------------------------
// GET SINGLE CUSTOMER
// -----------------------------------
export const getCustomer = async (
  customerId
) => {

  const response =
    await axiosClient.get(

      `/customers/${customerId}/`
    );

  return response.data;
};


// -----------------------------------
// UPDATE CUSTOMER
// -----------------------------------
export const updateCustomer = async (

  customerId,

  customerData
) => {

  const response =
    await axiosClient.put(

      `/customers/${customerId}/`,

      customerData
    );

  return response.data;
};


// -----------------------------------
// DELETE CUSTOMER
// -----------------------------------
export const deleteCustomer = async (
  customerId
) => {

  const response =
    await axiosClient.delete(

      `/customers/${customerId}/`
    );

  return response.data;
};