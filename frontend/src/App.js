import logo from './logo.svg';
import './App.css';
import './index.css';
import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";


export default function App() {

  return (

    <AuthProvider>

      <Toaster
        position="top-right"
      />

      <AppRoutes />

    </AuthProvider>
  );
}