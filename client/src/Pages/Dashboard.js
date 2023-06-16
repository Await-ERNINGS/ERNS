import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Logout } from "./Logout";
import "./Dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("http://localhost:5000/expensebycategory");
        const data = await res.json();
        setExpenses(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIncomes = async () => {
      try {
        const res = await fetch("http://localhost:5000/incomebycategory");
        const data = await res.json();
        setIncomes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenses();
    fetchIncomes();
  }, []);

  const expenseCategories = expenses.map((expense) => expense.category_name);
  const expenseAmount = expenses.map((expense) => expense.total_amount);
  const totalExpense = expenses.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.total_amount);
  }, 0);

  const incomeCategories = incomes.map((income) => income.category_name);
  const incomeAmount = incomes.map((income) => income.total_amount);
  const totalIncome = incomes.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.total_amount);
  }, 0);

  const totalSaving = totalIncome - totalExpense;

  const expenseData = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Amount in $",
        data: expenseAmount,
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(10, 50, 255, 1)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(10, 50, 255, 1)",
        ],
        borderWidth: 2,
        spacing: 0,
      },
    ],
  };

  const incomeData = {
    labels: incomeCategories,
    datasets: [
      {
        label: "Amount in $",
        data: incomeAmount,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  // const handleExpenseClick = () => {
  //   navigate("/expense");
  // };
  return (
    <div>
      <Header />
      <div className="centered">
        <div className="centered-expenses">
          <h1>Expenses</h1>
          <Doughnut data={expenseData} />
          <h1>Total Expenses: {totalExpense}</h1>
        </div>
        <div className="centered-incomes">
          <h1>Incomes</h1>
          <Doughnut data={incomeData} />
          <h1>Total Incomes: {totalIncome}</h1>
        </div>
      </div>
      <h1>Total Saving: {totalSaving}</h1>
      {/* <button onClick={handleExpenseClick}>Expenses</button> */}
      <Footer />
      <Logout />
    </div>
  );
};
