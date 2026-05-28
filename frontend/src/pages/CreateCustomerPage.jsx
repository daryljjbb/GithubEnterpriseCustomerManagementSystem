import DashboardLayout
from "../components/layout/DashboardLayout";

import CustomerForm
from "../components/customers/CustomerForm";


export default function CreateCustomerPage() {

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

        <CustomerForm />

      </div>

    </DashboardLayout>
  );
}