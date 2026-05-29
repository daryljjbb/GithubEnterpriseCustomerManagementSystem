import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import DashboardLayout
from "../components/layout/DashboardLayout";

import CustomerTable
from "../components/customers/CustomerTable";

import useCustomers
from "../hooks/useCustomers";

import { deleteCustomer }
from "../services/customerService";

import CustomerDeleteModal
from "../components/customers/CustomerDeleteModal";

import toast from "react-hot-toast";

import { useState } from "react";


export default function CustomersPage() {

  const navigate = useNavigate();


  // -----------------------------------
  // CUSTOMER HOOK
  // -----------------------------------
  const {

    customers,

    loading,

    error,

    search,

    setSearch,

    status,

    setStatus,

    fetchCustomers,

  } = useCustomers();

  const [selectedCustomer,
  setSelectedCustomer] =
    useState(null);


   const handleDeleteCustomer =
  async (customer) => {

    try {

      await deleteCustomer(
        customer.id
      );

      toast.success(
        "Customer deleted"
      );

      fetchCustomers();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete customer"
      );
    }
};

  
 

  // -----------------------------------
  // ERROR STATE
  // -----------------------------------
  if (error) {

    return (

      <DashboardLayout>

        <div className="
          p-6
        ">

          <h1 className="
            text-2xl
            font-bold
            text-red-600
          ">
            Failed to load customers
          </h1>

        </div>

      </DashboardLayout>
    );
  }


  return (

    <DashboardLayout>

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        className="
          p-6
        "
      >

        {/* ----------------------------------- */}
        {/* PAGE HEADER */}
        {/* ----------------------------------- */}
        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-6
        ">

          <div>

            <h1 className="
              text-3xl
              font-bold
            ">
              Customers
            </h1>

            <p className="
              text-gray-500
              mt-1
            ">
              Manage customer accounts
            </p>

          </div>


          {/* ADD CUSTOMER BUTTON */}
          <button

            onClick={() =>
              navigate(
                "/customers/create"
              )
            }

            className="
              bg-blue-600
              text-white
              px-5
              py-3
              rounded-xl
              hover:bg-blue-700
              transition
              shadow
            "
          >

            Add Customer

          </button>

        </div>


        {/* ----------------------------------- */}
        {/* SEARCH + FILTERS */}
        {/* ----------------------------------- */}
        <div className="
          bg-white
          rounded-2xl
          shadow-md
          p-4
          mb-6
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            gap-4
          ">

            {/* SEARCH INPUT */}
            <input

              type="text"

              placeholder="
                Search customers...
              "

              value={search}

              onChange={(e) =>

                setSearch(
                  e.target.value
                )
              }

              className="
                border
                border-gray-300
                rounded-xl
                p-3
                flex-1
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />


            {/* STATUS FILTER */}
            <select

              value={status}

              onChange={(e) =>

                setStatus(
                  e.target.value
                )
              }

              className="
                border
                border-gray-300
                rounded-xl
                p-3
                w-full
                md:w-64
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="">
                All Statuses
              </option>

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>

              <option value="lead">
                Lead
              </option>

            </select>

          </div>

        </div>


        {/* ----------------------------------- */}
        {/* CUSTOMER TABLE */}
        {/* ----------------------------------- */}
        <div className="
            bg-white
            rounded-2xl
            shadow-md
            overflow-hidden
          ">

            {loading ? (

              <div className="
                p-6
                text-center
              ">

                Loading customers...

              </div>

            ) : (

             <CustomerTable

                customers={customers}

                onDelete={
                  handleDeleteCustomer
                }
              />

            )}

          </div>

      </motion.div>

    </DashboardLayout>
  );
}