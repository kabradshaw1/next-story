"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "@/lib/store";
import { setAuth } from "@/lib/slices/authSlice";

// Define the form's data structure
interface FormValues {
  auth: string;
}

const Items: React.FC = () => {
  // Initialize useForm with the expected form data structure
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setAuth({ token: data.auth }));
  };

  return (
    <div>
      <h1>Items</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("auth")} // Registers input for "auth" field
          type="text"
          placeholder="Auth"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Items;
