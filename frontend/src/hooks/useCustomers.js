import {
  useEffect,
  useState
} from "react";

import {
  getCustomers
} from "../services/customerService";

import toast from "react-hot-toast";


export default function useCustomers() {

  // -----------------------------------
  // STATE
  // -----------------------------------
  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  // -----------------------------------
  // SEARCH + FILTERS
  // -----------------------------------
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");


  // -----------------------------------
  // DEBOUNCED SEARCH
  // -----------------------------------
  const [debouncedSearch,
    setDebouncedSearch] =
      useState("");


  // -----------------------------------
  // WAIT BEFORE SEARCHING
  // -----------------------------------
  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(search);

    }, 400);


    return () => clearTimeout(timer);

  }, [search]);


  // -----------------------------------
  // FETCH CUSTOMERS
  // -----------------------------------
  useEffect(() => {

    fetchCustomers();

  }, [debouncedSearch, status]);


  const fetchCustomers = async () => {

    try {

      setLoading(true);

      setError(null);

      const data =
        await getCustomers(

          debouncedSearch,

          status
        );

      setCustomers(data);

    } catch (error) {

      console.error(
        "Failed to fetch customers:",
        error
      );

      setError(error);

    } finally {

      setLoading(false);
    }
  };


  return {

    customers,

    loading,

    error,

    search,

    setSearch,

    status,

    setStatus,

    fetchCustomers,
  };
}