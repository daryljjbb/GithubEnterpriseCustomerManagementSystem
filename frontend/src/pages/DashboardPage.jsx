import {
  useAuthContext
} from "../context/AuthContext";

import AdminPanel from "../components/panels/AdminPanel";

import AgentPanel from "../components/panels/AgentPanel";

import CustomerPanel from "../components/panels/CustomerPanel";


export default function DashboardPage() {

  const { user, loading } =
    useAuthContext();


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
  // ROLE-BASED RENDERING
  // -----------------------------------
  if (user?.role === "admin") {

    return <AdminPanel />;
  }

  if (user?.role === "agent") {

    return <AgentPanel />;
  }

  return <CustomerPanel />;
}