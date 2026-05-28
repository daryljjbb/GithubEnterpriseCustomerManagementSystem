import { useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import axiosClient from "../../lib/axiosClient";

import { fadeIn } from "../../animations/motionVariants";

import {
  useAuthContext
} from "../../context/AuthContext";


export default function LoginForm() {

  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axiosClient.post(
        "/login/",
        formData
      );

      login(
        response.data.tokens,
        response.data.user
      );

      toast.success("Login successful");

      window.location.href = "/dashboard";

    } catch (error) {

  console.error(
    "LOGIN ERROR:",
    error.response?.data
  );

  toast.error(
    JSON.stringify(
      error.response?.data
    )
  );
} 
};


  return (
    <motion.form
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="
        bg-white
        p-8
        rounded-2xl
        shadow-xl
        w-full
        max-w-md
      "
    >

      <h2 className="
        text-3xl
        font-bold
        mb-6
        text-center
      ">
        Login
      </h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="
          w-full
          border
          p-3
          rounded-lg
          mb-4
        "
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="
          w-full
          border
          p-3
          rounded-lg
          mb-4
        "
      />

      <button
        type="submit"
        className="
          w-full
          bg-blue-600
          text-white
          p-3
          rounded-lg
          hover:bg-blue-700
          transition
        "
      >
        Sign In
      </button>

    </motion.form>
  );
}