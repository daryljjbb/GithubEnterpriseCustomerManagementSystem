import axios from "axios";

import {
  handleSessionExpired
} from "../utils/sessionManager";

import toast from "react-hot-toast";

// -----------------------------------
// AXIOS INSTANCE
// -----------------------------------
const axiosClient = axios.create({

  baseURL:
    "http://127.0.0.1:8000/api/",
});


// -----------------------------------
// REQUEST INTERCEPTOR
// -----------------------------------
axiosClient.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("access");

    if (token) {

      config.headers.Authorization =

        `Bearer ${token}`;
    }

    return config;
  }
);


// -----------------------------------
// RESPONSE INTERCEPTOR
// -----------------------------------
axiosClient.interceptors.response.use(

  // SUCCESS
  (response) => response,


  // ERRORS
  async (error) => {

    const originalRequest =
      error.config;


    // -----------------------------------
    // ACCESS TOKEN EXPIRED
    // -----------------------------------
    if (

      error.response?.status === 401

      &&

      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        // GET REFRESH TOKEN
        const refresh =
          localStorage.getItem(
            "refresh"
          );


        // REQUEST NEW ACCESS TOKEN
        const response =
          await axios.post(

            "http://127.0.0.1:8000/api/token/refresh/",

            { refresh }
          );


        // STORE NEW ACCESS TOKEN
        localStorage.setItem(

          "access",

          response.data.access
        );


        // RETRY ORIGINAL REQUEST
        originalRequest.headers.Authorization =

          `Bearer ${response.data.access}`;


        return axiosClient(
          originalRequest
        );

      } catch (refreshError) {

        console.error(

          "Refresh token expired:",

          refreshError
        );


        // SESSION EXPIRED
        handleSessionExpired();
      }
    }


    // -----------------------------------
    // FORBIDDEN
    // -----------------------------------
    if (

      error.response?.status === 403
    ) {

      toast.error(

        "You do not have permission to perform this action."
      );
    }


    // -----------------------------------
    // SERVER ERROR
    // -----------------------------------
    if (

      error.response?.status >= 500
    ) {

      toast.error(

        "Server error occurred."
      );
    }


    return Promise.reject(error);
  }
);

export default axiosClient;