import {
  useNavigate
} from "react-router-dom";

import {
  useAuthContext
} from "../../context/AuthContext";


export default function Topbar() {

  const navigate = useNavigate();

  const {
    user,
    logout
  } = useAuthContext();


  // -----------------------------------
  // LOGOUT
  // -----------------------------------
  const handleLogout = () => {

    logout();

    navigate("/");
  };


  return (

    <div className="
      bg-white
      shadow-md
      px-8
      py-4
      flex
      justify-between
      items-center
    ">

      {/* LEFT */}
      <div>

        <h2 className="
          text-2xl
          font-bold
          text-gray-800
        ">
          Welcome Back
        </h2>

      </div>


      {/* RIGHT */}
      <div className="
        flex
        items-center
        gap-4
      ">

        <div className="
          text-right
        ">

          <p className="
            font-semibold
          ">
            {user?.username}
          </p>

          <p className="
            text-sm
            text-gray-500
            capitalize
          ">
            {user?.role}
          </p>

        </div>


        <button

          onClick={handleLogout}

          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
          "
        >

          Logout

        </button>

      </div>

    </div>
  );
}