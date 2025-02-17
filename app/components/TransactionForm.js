"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function TransactionForm({ onAdd }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/transactions", data);
      onAdd(response.data);
      reset();
    } catch (error) {
      console.error("Error adding transaction", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
      <Input type="number" {...register("amount", { required: true })} placeholder="Amount" />
      <Input type="text" {...register("description", { required: true })} placeholder="Description" />
      <Input type="date" {...register("date", { required: true })} />
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
