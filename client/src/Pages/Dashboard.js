import React, { useEffect, useState } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/test");
        const data = await res.json();
        setTransaction(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, []);

  const expenses = transaction.filter((trans) => trans.type === "Expense");
  const expenseDescriptions = expenses.map((expense) => expense.description);
  const expenseAmounts = expenses.map((expense) => expense.amount);

  const incomes = transaction.filter((trans) => trans.type === "Income");
  const incomeDescriptions = incomes.map((income) => income.description);
  const incomeAmounts = incomes.map((income) => income.amount);

  const expenseData = {
    labels: expenseDescriptions,
    datasets: [
      {
        label: "Amount",
        data: expenseAmounts,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 5,
        spacing: 0,
      },
    ],
  };

  const incomeData = {
    labels: incomeDescriptions,
    datasets: [
      {
        label: "Amount",
        data: incomeAmounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 5,
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
        </div>
        <div className="incomes">
          <h1>Incomes</h1>
          <Doughnut data={incomeData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
