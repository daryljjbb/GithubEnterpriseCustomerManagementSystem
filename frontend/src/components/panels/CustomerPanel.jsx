import DashboardLayout from "../layout/DashboardLayout";

import {
  useAuthContext
} from "../../context/AuthContext";


export default function CustomerPanel() {

  const { user } = useAuthContext();

  return (

    <DashboardLayout
      title="Customer Dashboard"
    >

      <div className="
        space-y-6
      ">

        <div>

          <h2 className="
            text-2xl
            font-semibold
          ">
            Welcome
          </h2>

          <p className="
            text-gray-600
          ">
            {user?.username}
          </p>

        </div>

        <div className="
          bg-blue-50
          p-6
          rounded-xl
        ">

          <h3 className="
            font-bold
            text-xl
          ">
            Active Policies
          </h3>

          <p className="
            text-3xl
            mt-3
          ">
            2
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}