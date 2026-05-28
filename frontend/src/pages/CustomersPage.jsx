import { motion } from "framer-motion";

import DashboardLayout
from "../components/layout/DashboardLayout";

import useCustomers
from "../hooks/useCustomers";

import CustomerTable
from "../components/customers/CustomerTable";

import { Link }
from "react-router-dom";


export default function CustomersPage() {

  const {

    customers,

    loading,

  } = useCustomers();


  // -----------------------------------
  // LOADING STATE
  // -----------------------------------
  if (loading) {

    return (

      <DashboardLayout>

        <div className="
          p-6
        ">

          <h1 className="
            text-2xl
            font-bold
          ">
            Loading customers...
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

        {/* PAGE HEADER */}
        <div className="
          flex
          items-center
          justify-between
          mb-6
        ">

          <h1 className="
            text-3xl
            font-bold
          ">
            Customers
          </h1>

          <Link

          to="/customers/create"

          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-blue-700
            transition
          "
        >

          Add Customer

        </Link>

        </div>


        {/* CUSTOMER TABLE */}
        <CustomerTable
          customers={customers}
        />

      </motion.div>

    </DashboardLayout>
  );
}