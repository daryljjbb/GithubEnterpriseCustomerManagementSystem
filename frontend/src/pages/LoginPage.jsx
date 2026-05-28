import {
  useEffect
} from "react";

import {
  useNavigate
} from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";

import {
  useAuthContext
} from "../context/AuthContext";


export default function LoginPage() {

  const navigate = useNavigate();

  const {
    user,
    loading
  } = useAuthContext();


  // -----------------------------------
  // REDIRECT AUTHENTICATED USERS
  // -----------------------------------
  useEffect(() => {

    if (user) {

      navigate("/dashboard");
    }

  }, [user, navigate]);


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
        bg-gray-100
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


  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-100
      to-gray-200
      p-6
    ">

      {/* AUTH CARD */}
      <div className="
        w-full
        max-w-md
      ">

        {/* BRANDING */}
        <div className="
          text-center
          mb-8
        ">

          <h1 className="
            text-4xl
            font-bold
            text-gray-800
            mb-2
          ">
            Insurance Portal
          </h1>

          <p className="
            text-gray-600
          ">
            Secure Enterprise Authentication
          </p>

        </div>


        {/* LOGIN FORM */}
        <LoginForm />

      </div>

    </div>
  );
}