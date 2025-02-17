"use client";
import { Button } from "./ui/button";

export default function TransactionList({ transactions, onDelete }) {
  return (
    <div>
      {transactions.map((tx) => (
        <div key={tx._id} className="p-2 border flex justify-between">
          <span>{tx.description} - ₹{tx.amount}</span>
          <Button onClick={() => onDelete(tx._id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
