import React from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Transactions = ({
  transactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
}) => {
  return(
  <div className="main-container">
    <TransactionForm addTransaction={addTransaction}/>
    <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} editTransaction={editTransaction}/>
  </div>
  );
};

export default Transactions;
