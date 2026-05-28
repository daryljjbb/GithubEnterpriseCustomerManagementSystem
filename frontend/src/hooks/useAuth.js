import { useEffect, useState } from "react";
import axiosClient from "../lib/axiosClient";


export default function useAuth() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    fetchUser();

  }, []);


  const fetchUser = async () => {

    try {

      const response = await axiosClient.get("/me/");

      setUser(response.data);

    } catch (error) {

      console.error("Failed to fetch user", error);
    }
  };

  return {
    user,
  };
}