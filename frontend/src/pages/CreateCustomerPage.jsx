import { useNavigate }
from "react-router-dom";

import toast
from "react-hot-toast";

import DashboardLayout
from "../components/layout/DashboardLayout";

import CustomerForm
from "../components/customers/CustomerForm";

import {
  createCustomer
} from "../services/customerService";


export default function CreateCustomerPage() {

  const navigate = useNavigate();


  // -----------------------------------
  // CREATE CUSTOMER
  // -----------------------------------
  const handleCreateCustomer =
    async (formData) => {

      try {

        await createCustomer(formData);

        toast.success(
          "Customer created successfully"
        );

        navigate("/customers");

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to create customer"
        );
      }
    };


  return (

    <DashboardLayout>

      <div className="
        p-6
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-6
        ">
          Create Customer
        </h1>


        <CustomerForm

          onSubmit={
            handleCreateCustomer
          }

          submitText="Create Customer"
        />

      </div>

    </DashboardLayout>
  );
}