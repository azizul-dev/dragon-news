"use client";

import { authClient } from "@/lib/auth-client";
import { is } from "date-fns/locale";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLoginFunction = async (formData) => {
    const { email, password } = formData;
    const { data, error } = await authClient.signIn.email({
      email: email, // required
      password: password, // required
      rememberMe: true,
      callbackURL: "/",
    });
    console.log(data, error);
 
    if(error){
      alert(error.message);
    }
    if(data){
      alert("Login successful");
    }
  };

  return (
    <div className=" container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100">
      <div className=" p-4 rounded-xl bg-white">
        <h2 className=" font-bold text-3xl text-center mb-5">
          Login your account
        </h2>
        <form
          onSubmit={handleSubmit(handleLoginFunction)}
          className=" space-y-4"
        >
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input"
              placeholder="Type here email"
              {...register("email", { required: "Email field is required" })}
            />
            {errors.email && (
              <p className=" text-red-500">{errors.email.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Password</legend>
            <input
              type={isShowPassword ? "text" : "password"}
              className="input"
              placeholder="Type here password"
              {...register("password", {
                required: "password field is required",
              })}
            />
            <span className=" absolute right-2 top-5 cursor-pointer" onClick={() => setIsShowPassword(!isShowPassword)}>
              { isShowPassword ? <FaEye /> : <FaEyeSlash/>}
            </span>

            {errors.password && (
              <p className=" text-red-500">{errors.password.message}</p>
            )}
          </fieldset>
          <button className="btn w-full bg-slate-800 text-white">Login</button>
        </form>
        <p>
          do not have an account?{" "}
          <Link href="/register" className=" text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
