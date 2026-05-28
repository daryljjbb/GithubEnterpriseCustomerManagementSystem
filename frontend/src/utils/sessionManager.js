import toast from "react-hot-toast";


// -----------------------------------
// SESSION EXPIRED HANDLER
// -----------------------------------
export function handleSessionExpired() {

  // CLEAR TOKENS
  localStorage.removeItem("access");

  localStorage.removeItem("refresh");

  localStorage.removeItem("user");


  // SHOW MESSAGE
  toast.error(

    "Your session has expired. Please login again."
  );


  // REDIRECT TO LOGIN
  window.location.href = "/";
}