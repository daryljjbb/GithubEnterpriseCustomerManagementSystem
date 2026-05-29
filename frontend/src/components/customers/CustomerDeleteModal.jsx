import { motion } from "framer-motion";

export default function CustomerDeleteModal({

  customer,

  onConfirm,

  onCancel,
}) {

  return (

    <div className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    ">

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.9,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        className="
          bg-white
          rounded-2xl
          p-6
          w-full
          max-w-md
          shadow-2xl
        "
      >

        <h2 className="
          text-2xl
          font-bold
          mb-4
        ">
          Delete Customer
        </h2>

        <p className="text-gray-600 mb-6">

          Are you sure you want to
          delete:

          <span className="font-bold">
            {" "}
            {customer.first_name}
            {" "}
            {customer.last_name}
          </span>

          ?

        </p>

        <div className="
          flex
          justify-end
          gap-3
        ">

          <button

            onClick={onCancel}

            className="
              px-4
              py-2
              rounded-lg
              border
            "
          >
            Cancel
          </button>

          <button

            onClick={onConfirm}

            className="
              bg-red-600
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-red-700
            "
          >
            Delete
          </button>

        </div>

      </motion.div>

    </div>
  );
}