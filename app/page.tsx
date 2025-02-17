"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

// Define the Transaction Type
type Transaction = {
  _id?: string;
  amount: number;
  date: string;
  description: string;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get<Transaction[]>("/api/transactions");
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleAdd = async (newTx: Transaction) => {
    try {
      // 1️⃣ Send the transaction to the backend
      const res = await axios.post("/api/transactions", newTx);

      // 2️⃣ Update state **only after successful API response**
      setTransactions((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/transactions?id=${id}`);

      // Update state after deletion
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
      <TransactionForm onAdd={handleAdd} />
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      )}
    </div>
  );
}
