import {
  NavLink
} from "react-router-dom";

import {
  navigation
} from "../../config/navigation";

import {
  useAuthContext
} from "../../context/AuthContext";


export default function Sidebar() {

  const { user } =
    useAuthContext();


  // -----------------------------------
  // GET ROLE NAVIGATION
  // -----------------------------------
  const links =
    navigation[user?.role] || [];


  return (

    <div className="
      w-64
      bg-gray-900
      text-white
      min-h-screen
      p-6
      flex
      flex-col
    ">

      {/* LOGO */}
      <div className="
        mb-10
      ">

        <h1 className="
          text-2xl
          font-bold
        ">
          IMS Portal
        </h1>

      </div>


      {/* NAVIGATION */}
      <nav className="
        flex
        flex-col
        gap-3
      ">

        {links.map((link) => (

          <NavLink

            key={link.path}

            to={link.path}

            className={({ isActive }) =>

              `
              px-4
              py-3
              rounded-lg
              transition
              font-medium

              ${

                isActive

                ? "bg-blue-600"

                : "hover:bg-gray-800"
              }
              `
            }
          >

            {link.name}

          </NavLink>
        ))}

      </nav>

    </div>
  );
}