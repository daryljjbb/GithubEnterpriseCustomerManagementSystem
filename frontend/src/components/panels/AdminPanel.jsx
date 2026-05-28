import DashboardLayout from "../layout/DashboardLayout";

import {
  useAuthContext
} from "../../context/AuthContext";


export default function AdminPanel() {

  const { user } = useAuthContext();

  return (

    <DashboardLayout
      title="Admin Dashboard"
    >

      <div className="
        space-y-6
      ">

        <div>

          <h2 className="
            text-2xl
            font-semibold
          ">
            Welcome Admin
          </h2>

          <p className="
            text-gray-600
          ">
            {user?.username}
          </p>

        </div>

        {/* STATS GRID */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        ">

          <div className="
            bg-blue-100
            p-6
            rounded-xl
          ">
            <h3 className="
              font-bold
              text-lg
            ">
              Users
            </h3>

            <p className="
              text-3xl
              mt-2
            ">
              120
            </p>
          </div>

          <div className="
            bg-green-100
            p-6
            rounded-xl
          ">
            <h3 className="
              font-bold
              text-lg
            ">
              Active Sessions
            </h3>

            <p className="
              text-3xl
              mt-2
            ">
              42
            </p>
          </div>

          <div className="
            bg-red-100
            p-6
            rounded-xl
          ">
            <h3 className="
              font-bold
              text-lg
            ">
              Failed Logins
            </h3>

            <p className="
              text-3xl
              mt-2
            ">
              8
            </p>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}