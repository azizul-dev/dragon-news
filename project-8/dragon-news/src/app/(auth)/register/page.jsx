"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const [isShowPassword, setIsShowPassword] = useState(false);
  

  const handleRegisterFunction = async (formData) => {
    const { email, name, photo, password } = formData;

    const { data, error } = await authClient.signUp.email({
      name: name, // required
      email: email, // required
      password: password, // required
      image: photo,
      callbackURL: "/",
    });
    console.log(data, error);

    if (error) {
      alert(error.message);
    }
    if (data) {
      alert("Signup Successful");
    }
  };

  return (
    <div className=" container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100">
      <div className=" p-4 rounded-xl bg-white">
        <h2 className=" font-bold text-3xl text-center mb-5">
          Register your account
        </h2>
        <form
          onSubmit={handleSubmit(handleRegisterFunction)}
          className=" space-y-4"
        >
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here name"
              {...register("name", { required: "Name field is required" })}
            />
            {errors.name && (
              <p className=" text-red-500">{errors.name.message}</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here photo url"
              {...register("photo", {
                required: "Photo URL field is required",
              })}
            />
            {errors.photo && (
              <p className=" text-red-500">{errors.photo.message}</p>
            )}
          </fieldset>

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
            <span
              className=" absolute right-7 top-5 cursor-pointer"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && (
              <p className=" text-red-500">{errors.password.message}</p>
            )}
          </fieldset>
          <button className="btn w-full bg-slate-800 text-white">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
