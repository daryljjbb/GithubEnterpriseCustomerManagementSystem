import { Link }
from "react-router-dom";

import { useState }
from "react";

import CustomerDeleteModal from "./CustomerDeleteModal";




export default function CustomerTable({

  customers,

  onDelete
}) {

  const [selectedCustomer,setSelectedCustomer] = useState(null);



 

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-lg
      overflow-hidden
    ">

      <table className="
        w-full
      ">

        {/* TABLE HEADER */}
        <thead className="
          bg-gray-100
        ">

          <tr>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Status
            </th>
            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>


        {/* TABLE BODY */}
        <tbody>

          {customers.map((customer) => (

            <tr

              key={customer.id}

              onClick={() =>

                window.location.href =
                  `/customers/${customer.id}`
              }

              className="
                border-t
                hover:bg-gray-50
                transition
                cursor-pointer
              "
            >

              <td className="p-4">

                {customer.first_name}
                {" "}
                {customer.last_name}

              </td>

              <td className="p-4">
                {customer.email}
              </td>

              <td className="p-4">
                {customer.phone}
              </td>

              <td className="p-4">

                <span className="
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  bg-blue-100
                  text-blue-700
                ">

                  {customer.status}

                </span>

              </td>
              <td className="p-4">
                <button

                  onClick={(e) => {

                    e.stopPropagation();

                    setSelectedCustomer(customer);
                  }}

                  className="
                    bg-red-500
                    text-white
                    px-3
                    py-1
                    rounded-lg
                    text-sm
                    hover:bg-red-600
                  "
                >
                  Delete
                </button>
                
              </td>
            </tr>
          ))}

        </tbody>

      </table>

      {
          selectedCustomer && (

            <CustomerDeleteModal

              customer={selectedCustomer}

             onConfirm={() =>
                onDelete(selectedCustomer)
              }

              onCancel={() =>
                setSelectedCustomer(null)
              }
            />
          )
        }

    </div>
  );
}