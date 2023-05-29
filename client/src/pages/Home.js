// import Container from '@mui/material/Container';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
// import TransactionChart from '../components/TransactionChart';
import ExpenseForm from '../components/ExpenseForm';
import EmployeeExpenseList from '../components/EmployeeExpenseList';
import DataList from '../components/DataList';
import { useSelector } from 'react-redux';
import { useOutletContext, useNavigate } from 'react-router-dom';
import HRExpenseList from '../components/HRExpenseList';
import DirectorExpenseList from '../components/DirectorExpenseList';
import FinanceDepartmentExpenseList from '../components/FinanceDepartmentExpenseList';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});
  const navigate = useNavigate();
  const currentUser = useSelector((storeState) => storeState.auth.user);
  const currentUserType = currentUser.user.userType;

  // const [currentUser] = useOutletContext();
  // var currentUser = GetCurrentUser();
  // console.log(currentUser);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function GetCurrentUser() {
    const currentUser = await useSelector((storeState) => storeState.auth.user);
    return currentUser;
  }

  async function fetchExpenses() {
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/expense`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setExpenses(data);
  }

  return (
    <>
      {currentUserType === 'Employee' && (
        <ExpenseForm
          fetchExpenses={fetchExpenses}
          editTransaction={editTransaction}
        />
      )}
      {currentUserType === 'Employee' && (
        <EmployeeExpenseList
          data={expenses}
          fetchExpenses={fetchExpenses}
          setEditTransaction={setEditTransaction}
        />
      )}
      {currentUserType === 'HR' && <HRExpenseList />}
      {currentUserType === 'Director' && <DirectorExpenseList />}
      {currentUserType === 'FinanceDept' && <FinanceDepartmentExpenseList />}

      {/* <DataList data={expenses} fetchExpenses={fetchExpenses} /> */}
    </>
  );
}
