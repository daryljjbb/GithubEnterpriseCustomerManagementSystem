import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage
from "../pages/LoginPage";

import DashboardPage
from "../pages/DashboardPage";

import UnauthorizedPage
from "../pages/UnauthorizedPage";

import AdminPage
from "../pages/AdminPage";

import AgentPage
from "../pages/AgentPage";

import CustomersPage
from "../pages/CustomersPage";

import ProtectedRoute
from "./ProtectedRoute";

import RoleRoute
from "./RoleRoute";

import CreateCustomerPage
from "../pages/CreateCustomerPage";


export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<LoginPage />}
        />


        {/* DASHBOARD */}
        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <DashboardPage />

            </ProtectedRoute>
          }
        />
        <Route

          path="/customers"

          element={

            <ProtectedRoute>

              <CustomersPage />

            </ProtectedRoute>
          }
        />

        <Route

          path="/customers/create"

          element={

            <ProtectedRoute>

              <CreateCustomerPage />

            </ProtectedRoute>
          }
        />


        {/* ADMIN ROUTE */}
        <Route

          path="/admin"

          element={

            <RoleRoute
              allowedRoles={["admin"]}
            >

              <AdminPage />

            </RoleRoute>
          }
        />


        {/* AGENT ROUTE */}
        <Route

          path="/agent"

          element={

            <RoleRoute
              allowedRoles={["agent"]}
            >

              <AgentPage />

            </RoleRoute>
          }
        />


        {/* CUSTOMER ROUTE */}
        <Route

          path="/customer"

          element={

            <RoleRoute
              allowedRoles={["customer"]}
            >

              <CustomersPage />

            </RoleRoute>
          }
        />


        {/* UNAUTHORIZED */}
        <Route

          path="/unauthorized"

          element={
            <UnauthorizedPage />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}