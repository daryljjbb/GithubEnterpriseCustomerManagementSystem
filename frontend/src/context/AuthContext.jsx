import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axiosClient from "../lib/axiosClient";

const AuthContext = createContext();


export function AuthProvider({
  children
}) {

  // -----------------------------------
  // USER STATE
  // -----------------------------------
  const [user, setUser] = useState(null);

  // -----------------------------------
  // LOADING STATE
  // -----------------------------------
  const [loading, setLoading] =
    useState(true);


  // -----------------------------------
  // LOAD USER ON APP START
  // -----------------------------------
  useEffect(() => {

    const token =
      localStorage.getItem("access");

    // Only fetch user if token exists
    if (token) {

      fetchCurrentUser();

    } else {

      setLoading(false);
    }

  }, []);


  // -----------------------------------
  // FETCH CURRENT USER
  // -----------------------------------
  const fetchCurrentUser = async () => {

    try {

      const response =
        await axiosClient.get("/me/");

      setUser(response.data);

    } catch (error) {

      console.error(
        "Failed to fetch user:",
        error
      );

      // If token invalid remove auth
      logout();

    } finally {

      setLoading(false);
    }
  };


  // -----------------------------------
  // LOGIN FUNCTION
  // -----------------------------------
  const login = (tokens, userData) => {

    // Store access token
    localStorage.setItem(
      "access",
      tokens.access
    );

    // Store refresh token
    localStorage.setItem(
      "refresh",
      tokens.refresh
    );

    // Store user
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    // Update React state
    setUser(userData);
  };


  // -----------------------------------
  // LOGOUT FUNCTION
  // -----------------------------------
 const logout = async () => {

  try {

    const refresh =
      localStorage.getItem(
        "refresh"
      );


    // BACKEND LOGOUT
    await axiosClient.post(

      "/logout/",

      { refresh }
    );

  } catch (error) {

    console.error(

      "Logout failed:",

      error
    );

  } finally {

    // ALWAYS CLEAN LOCAL SESSION
    localStorage.removeItem(
      "access"
    );

    localStorage.removeItem(
      "refresh"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    window.location.href = "/";
  }
};


  return (

    <AuthContext.Provider
      value={{

        user,

        loading,

        login,

        logout,

        fetchCurrentUser,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}


// -----------------------------------
// CUSTOM HOOK
// -----------------------------------
export function useAuthContext() {

  return useContext(AuthContext);
}