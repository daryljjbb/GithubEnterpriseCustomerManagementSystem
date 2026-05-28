import {
  Link
} from "react-router-dom";


export default function UnauthorizedPage() {

  return (

    <div className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      bg-gray-100
      text-center
      p-8
    ">

      <h1 className="
        text-5xl
        font-bold
        text-red-500
        mb-4
      ">
        403
      </h1>

      <h2 className="
        text-2xl
        font-semibold
        mb-2
      ">
        Unauthorized Access
      </h2>

      <p className="
        text-gray-600
        mb-6
      ">
        You do not have permission
        to view this page.
      </p>

      <Link

        to="/dashboard"

        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-lg
        "
      >

        Return Dashboard

      </Link>

    </div>
  );
}