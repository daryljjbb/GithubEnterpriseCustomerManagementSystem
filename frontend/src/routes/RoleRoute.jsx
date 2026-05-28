import {
  Navigate
} from "react-router-dom";

import {
  useAuthContext
} from "../context/AuthContext";


export default function RoleRoute({

  children,

  allowedRoles
}) {

  const {
    user,
    loading
  } = useAuthContext();


  // -----------------------------------
  // LOADING STATE
  // -----------------------------------
  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">

        <h1 className="
          text-2xl
          font-bold
        ">
          Loading...
        </h1>

      </div>
    );
  }


  // -----------------------------------
  // NOT LOGGED IN
  // -----------------------------------
  if (!user) {

    return <Navigate to="/" />;
  }


  // -----------------------------------
  // ROLE NOT ALLOWED
  // -----------------------------------
  if (

    !allowedRoles.includes(
      user.role
    )
  ) {

    return (

      <Navigate
        to="/unauthorized"
      />
    );
  }


  // -----------------------------------
  // AUTHORIZED
  // -----------------------------------
  return children;
}