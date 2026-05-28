import {
  useAuthContext
} from "../../context/AuthContext";


export default function Navbar() {

  const {
    user,
    logout
  } = useAuthContext();


  return (

    <div className="
      bg-white
      shadow-md
      px-6
      py-4
      flex
      justify-between
      items-center
    ">

      <div>

        <h1 className="font-bold text-xl">
          Insurance Portal
        </h1>

      </div>


      <div className="flex items-center gap-4">

        <span className="font-medium">
          {user?.username}
        </span>

        <span className="
          bg-blue-100
          text-blue-700
          px-3
          py-1
          rounded-full
          text-sm
        ">
          {user?.role}
        </span>

        <button
          onClick={logout}
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-red-600
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}