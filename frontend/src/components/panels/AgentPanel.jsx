import DashboardLayout from "../layout/DashboardLayout";

import {
  useAuthContext
} from "../../context/AuthContext";


export default function AgentPanel() {

  const { user } = useAuthContext();

  return (

    <DashboardLayout
      title="Agent Dashboard"
    >

      <div className="
        space-y-6
      ">

        <div>

          <h2 className="
            text-2xl
            font-semibold
          ">
            Welcome Agent
          </h2>

          <p className="
            text-gray-600
          ">
            {user?.username}
          </p>

        </div>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          <div className="
            bg-indigo-100
            p-6
            rounded-xl
          ">

            <h3 className="
              font-bold
            ">
              Assigned Customers
            </h3>

            <p className="
              text-3xl
            ">
              25
            </p>

          </div>

          <div className="
            bg-yellow-100
            p-6
            rounded-xl
          ">

            <h3 className="
              font-bold
            ">
              Pending Claims
            </h3>

            <p className="
              text-3xl
            ">
              6
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}