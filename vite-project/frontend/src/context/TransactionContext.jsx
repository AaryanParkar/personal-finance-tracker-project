import { useContext, createContext, useState, useEffect } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setLoading(false);
      });
  }, []);

  const addTransaction = async (tx) => {
    try {
      const res = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx),
      });

      const newTx = await res.json();
      setTransactions((prev) => [newTx, ...prev]);
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const deleteTransaction = async (_id) => {
    try {
      await fetch(`http://localhost:5000/transactions/${_id}`, {
        method: "DELETE",
      });

      setTransactions((prev) => prev.filter((t) => t._id !== _id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const editTransaction = async (_id, tx) => {
    try {
      await fetch(`http://localhost:5000/transactions/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx),
      });

      setTransactions((prev) =>
        prev.map((t) => (t._id !== _id ? t : { ...t, ...tx }))
      );
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        loading
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);