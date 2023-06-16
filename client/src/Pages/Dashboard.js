import React, { useEffect, useState } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("http://localhost:5000/expensebycategory");
        const data = await res.json();
        setExpenses(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIncomes = async () => {
      try {
        const res = await fetch("http://localhost:5000/incomebycategory");
        const data = await res.json();
        setIncomes(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenses();
    fetchIncomes();
  }, []);

  // const expenses = transaction.filter((trans) => trans.type === "Expense");
  // const expenseDescriptions = expenses.map((expense) => expense.description);
  // const expenseAmounts = expenses.map((expense) => expense.amount);
  const expenseCategories = expenses.map((expense) => expense.category_name);
  const expenseAmount = expenses.map((expense) => expense.total_amount);
  const totalExpense = expenses.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.total_amount);
  }, 0);
  // console.log(expenses);
  // console.log(expenseCategories);
  // console.log(expenseAmount);
  const incomeCategories = incomes.map((income) => income.category_name);
  const incomeAmount = incomes.map((income) => income.total_amount);
  const totalIncome = incomes.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.total_amount);
  }, 0);
  // const incomes = transaction.filter((trans) => trans.type === "Income");
  // const incomeDescriptions = incomes.map((income) => income.description);
  // const incomeAmounts = incomes.map((income) => income.amount);
  const totalSaving = totalIncome - totalExpense;

  const expenseData = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Amount in $",
        data: expenseAmount,
        backgroundColor: [
          //blue
          "rgba(54, 162, 235, 1)",
          //yellow
          "rgba(255, 206, 86, 1)",
          //red
          "rgba(255, 99, 132, 1)",
          //green
          "rgba(75, 192, 192, 1)",
          //orange
          "rgba(255, 159, 64, 1)",
          //purple
          "rgba(153, 102, 255, 1)",
          //blue
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

  return (
    <div>
      <Header />
      <div>
        <div className="expenses">
          <h1>Expenses</h1>
          <Doughnut data={expenseData} />
          <h1>Total Expenses : {totalExpense}</h1>
        </div>
        <div className="incomes">
          <h1>Incomes</h1>
          <Doughnut data={incomeData} />
          <h1>Total Incomes : {totalIncome}</h1>
        </div>
      </div>
      <h1>Total Saving : {totalSaving}</h1>
      <Footer />
    </div>
  );
};
