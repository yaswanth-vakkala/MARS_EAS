// import Container from '@mui/material/Container';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
// import TransactionChart from '../components/TransactionChart';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/expense`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <>
      <ExpenseForm
        fetchExpenses={fetchExpenses}
        editTransaction={editTransaction}
      />

      <ExpenseList
        data={transactions}
        fetchExpenses={fetchExpenses}
        setEditTransaction={setEditTransaction}
      />
    </>
  );
}
