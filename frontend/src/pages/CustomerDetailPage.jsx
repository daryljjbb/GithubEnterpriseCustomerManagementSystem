import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

import { motion }
from "framer-motion";

import toast
from "react-hot-toast";

import DashboardLayout
from "../components/layout/DashboardLayout";

import {
  getCustomer
} from "../services/customerService";

import { Link }
from "react-router-dom";

import {
  deleteCustomer
} from "../services/customerService";

import {
  useNavigate
} from "react-router-dom";


export default function CustomerDetailPage() {

  const { id } = useParams();

  const [customer, setCustomer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();


  // -----------------------------------
  // FETCH CUSTOMER
  // -----------------------------------
  useEffect(() => {

    fetchCustomer();

  }, [id]);


  const fetchCustomer = async () => {

    try {

      setLoading(true);

      const data =
        await getCustomer(id);

      setCustomer(data);

    } catch (error) {

      console.error(
        "Failed to load customer:",
        error
      );

      toast.error(
        "Failed to load customer"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleDeleteCustomer =
  async () => {

    const confirmed =
      window.confirm(

        "Delete this customer?"
      );

    if (!confirmed) return;

    try {

      await deleteCustomer(
        customer.id
      );

      toast.success(
        "Customer deleted"
      );

      navigate("/customers");

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete customer"
      );
    }
  };


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
            Loading customer...
          </h1>

        </div>

      </DashboardLayout>
    );
  }


  // -----------------------------------
  // NO CUSTOMER FOUND
  // -----------------------------------
  if (!customer) {

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
            Customer not found
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

        {/* HEADER */}
        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

          <div>

            <h1 className="
              text-3xl
              font-bold
            ">

              {customer.first_name}
              {" "}
              {customer.last_name}

            </h1>

            <p className="
              text-gray-500
            ">

              Customer Profile

            </p>

          </div>
          <Link

                to={`/customers/${customer.id}/edit`}

                className="
                    bg-yellow-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-yellow-600
                    transition
                "
                >

                Edit Customer

         </Link>

        </div>


        {/* PROFILE CARD */}
        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          p-6
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          <div>

            <h2 className="
              text-sm
              text-gray-500
            ">
              Email
            </h2>

            <p className="
              font-semibold
            ">
              {customer.email}
            </p>

          </div>


          <div>

            <h2 className="
              text-sm
              text-gray-500
            ">
              Phone
            </h2>

            <p className="
              font-semibold
            ">
              {customer.phone}
            </p>

          </div>


          <div>

            <h2 className="
              text-sm
              text-gray-500
            ">
              Address
            </h2>

            <p className="
              font-semibold
            ">
              {customer.address}
            </p>

          </div>


          <div>

            <h2 className="
              text-sm
              text-gray-500
            ">
              Status
            </h2>

            <span className="
              inline-block
              bg-blue-100
              text-blue-700
              px-3
              py-1
              rounded-full
              text-sm
            ">

              {customer.status}

            </span>

          </div>

        </div>

      </motion.div>

    </DashboardLayout>
  );
}