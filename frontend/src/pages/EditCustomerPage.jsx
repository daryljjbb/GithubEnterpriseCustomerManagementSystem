import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import toast
from "react-hot-toast";

import DashboardLayout
from "../components/layout/DashboardLayout";

import CustomerForm
from "../components/customers/CustomerForm";

import {

  getCustomer,

  updateCustomer,

} from "../services/customerService";


export default function EditCustomerPage() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [customer, setCustomer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // -----------------------------------
  // FETCH CUSTOMER
  // -----------------------------------
  useEffect(() => {

    fetchCustomer();

  }, [id]);


  const fetchCustomer = async () => {

    try {

      const data =
        await getCustomer(id);

      setCustomer(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load customer"
      );

    } finally {

      setLoading(false);
    }
  };


  // -----------------------------------
  // UPDATE CUSTOMER
  // -----------------------------------
  const handleUpdateCustomer =
    async (formData) => {

      try {

        await updateCustomer(
          id,
          formData
        );

        toast.success(
          "Customer updated successfully"
        );

        navigate(
          `/customers/${id}`
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to update customer"
        );
      }
    };


  if (loading) {

    return (

      <DashboardLayout>

        <div className="p-6">

          Loading...

        </div>

      </DashboardLayout>
    );
  }


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
          Edit Customer
        </h1>


        <CustomerForm

          initialData={customer}

          onSubmit={
            handleUpdateCustomer
          }

          submitText="Update Customer"
        />

      </div>

    </DashboardLayout>
  );
}