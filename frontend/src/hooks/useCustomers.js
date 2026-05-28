import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import {
  getCustomers
} from "../services/customerService";


// -----------------------------------
// ENTERPRISE CUSTOMER HOOK
// -----------------------------------
export default function useCustomers() {

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  // -----------------------------------
  // FETCH CUSTOMERS
  // -----------------------------------
  const fetchCustomers = async () => {

    try {

      setLoading(true);

      const data =
        await getCustomers();

      setCustomers(data);

    } catch (error) {

      console.error(
        "Failed to fetch customers:",
        error
      );

      setError(error);

      toast.error(
        "Failed to load customers."
      );

    } finally {

      setLoading(false);
    }
  };


  // -----------------------------------
  // INITIAL LOAD
  // -----------------------------------
  useEffect(() => {

    fetchCustomers();

  }, []);


  return {

    customers,

    loading,

    error,

    fetchCustomers,
  };
}