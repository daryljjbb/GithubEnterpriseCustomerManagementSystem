import { useState }
from "react";

import { motion }
from "framer-motion";


export default function CustomerForm({

  initialData = {},

  onSubmit,

  submitText = "Save Customer",
}) {

  // -----------------------------------
  // FORM STATE
  // -----------------------------------
  const [formData, setFormData] =
    useState({

      first_name:
        initialData.first_name || "",

      last_name:
        initialData.last_name || "",

      email:
        initialData.email || "",

      phone:
        initialData.phone || "",

      address:
        initialData.address || "",

      city:
        initialData.city || "",

      state:
        initialData.state || "",

      zip_code:
        initialData.zip_code || "",

      status:
        initialData.status || "active",
    });


  const [loading, setLoading] =
    useState(false);


  // -----------------------------------
  // HANDLE INPUT CHANGE
  // -----------------------------------
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  // -----------------------------------
  // HANDLE SUBMIT
  // -----------------------------------
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await onSubmit(formData);

    } finally {

      setLoading(false);
    }
  };


  return (

    <motion.form

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      onSubmit={handleSubmit}

      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
    >

      {/* FIRST NAME */}
      <input

        type="text"

        name="first_name"

        placeholder="First Name"

        value={formData.first_name}

        onChange={handleChange}

        className="
          border
          rounded-xl
          p-3
        "
      />


      {/* LAST NAME */}
      <input

        type="text"

        name="last_name"

        placeholder="Last Name"

        value={formData.last_name}

        onChange={handleChange}

        className="
          border
          rounded-xl
          p-3
        "
      />


      {/* EMAIL */}
      <input

        type="email"

        name="email"

        placeholder="Email"

        value={formData.email}

        onChange={handleChange}

        className="
          border
          rounded-xl
          p-3
        "
      />


      {/* PHONE */}
      <input

        type="text"

        name="phone"

        placeholder="Phone"

        value={formData.phone}

        onChange={handleChange}

        className="
          border
          rounded-xl
          p-3
        "
      />


      {/* ADDRESS */}
      <input

        type="text"

        name="address"

        placeholder="Address"

        value={formData.address}

        onChange={handleChange}

        className="
          border
          rounded-xl
          p-3
          md:col-span-2
        "
      />


      {/* CITY */}
      <input

        type="text"

        name="city"

        placeholder="City"

        value={formData.city}

        onChange={handleChange}

        className="
          border
          rounded-xl
          p-3
        "
      />


      {/* STATE */}
      <input

        type="text"

        name="state"

        placeholder="State"

        value={formData.state}

        onChange={handleChange}

        className="
          border
          rounded-xl
          p-3
        "
      />


      {/* ZIP */}
      <input

        type="text"

        name="zip_code"

        placeholder="Zip Code"

        value={formData.zip_code}

        onChange={handleChange}

        className="
          border
          rounded-xl
          p-3
        "
      />


      {/* STATUS */}
      <select

        name="status"

        value={formData.status}

        onChange={handleChange}

        className="
          border
          rounded-xl
          p-3
        "
      >

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


      {/* SUBMIT BUTTON */}
      <button

        type="submit"

        disabled={loading}

        className="
          bg-blue-600
          text-white
          rounded-xl
          p-3
          hover:bg-blue-700
          transition
          md:col-span-2
        "
      >

        {loading
          ? "Saving..."
          : submitText}

      </button>

    </motion.form>
  );
}