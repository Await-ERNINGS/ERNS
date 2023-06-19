import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";

import "./Expense.css";
import axios from "axios";

export const Expense = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryAmounts, setCategoryAmounts] = useState({});
  const [categoryDescriptions, setCategoryDescriptions] = useState({});
  const [categoryDates, setCategoryDates] = useState({});
  const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  const [expense, setExpense] = useState([]);

  const updateTotal = async () => {
    const totalExpenses = await axios.get("http://localhost:5000/expenses");
    setTotalAmount(totalExpenses.data[0]["SUM(amount)"]);
  };

  const updateExpensePage = async () => {
    const expenses = await axios.get(
      "http://localhost:5000/expense_transactions"
    );
    console.log(expenses);
    setExpense(expenses.data);
  };

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/expense_transactions"
        );
        setExpense(response.data);
        console.log(response.data);
        setExpense(response.data);
        // const res = await fetch("http://localhost:5000/expense_transactions");
        // console.log(typeof res);
        updateTotal();
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };
    fetchExpense();
  }, []);

  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    const amount = event.target.value;
    setCategoryAmounts((prevCategoryAmounts) => ({
      ...prevCategoryAmounts,
      [selectedCategory]: amount,
    }));
  };

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    setCategoryDescriptions((prevCategoryDescriptions) => ({
      ...prevCategoryDescriptions,
      [selectedCategory]: description,
    }));
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setCategoryDates((prevCategoryDates) => ({
      ...prevCategoryDates,
      [selectedCategory]: date,
    }));
  };

  const handleAddExpense = async () => {
    if (selectedCategory.trim() !== "" && categoryAmounts[selectedCategory]) {
      const newExpense = {
        date: categoryDates[selectedCategory] || "", // Use an empty string as fallback
        category_name: selectedCategory,
        amount: categoryAmounts[selectedCategory],
        description: categoryDescriptions[selectedCategory],
        type: "Expense",
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/add_transaction/",
          newExpense
        );
        console.log(response.data);
        updateExpensePage();
        const updatedExpense = [...expense];
        updatedExpense.push(newExpense);
        setExpense(updatedExpense);
        updateTotal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteRow = async (index, transaction_id) => {
    try {
      await axios.delete(
        `http://localhost:5000/delete_transaction/${transaction_id}`
      );

      updateExpensePage();
    } catch (error) {
      console.log(error);
    }
    updateTotal();
    const updatedExpense = [...expense];
    updatedExpense.splice(index, 1);
    setExpense(updatedExpense);
  };

  const handleEditRow = (index) => {
    const selectedRowData = tableData[index];
    setSelectedCategory(selectedRowData.category);
    setCategoryAmounts((prevCategoryAmounts) => ({
      ...prevCategoryAmounts,
      [selectedRowData.category]: selectedRowData.amount,
    }));
    setCategoryDescriptions((prevCategoryDescriptions) => ({
      ...prevCategoryDescriptions,
      [selectedRowData.category]: selectedRowData.description,
    }));
    setCategoryDates((prevCategoryDates) => ({
      ...prevCategoryDates,
      [selectedRowData.category]: selectedRowData.date,
    }));
    setSelectedRow(index);
  };

  const updateTotalAmount = () => {
    const amounts = expense.map((row) => parseFloat(row.amount));
    const total = amounts.reduce((acc, cur) => acc + cur, 0);
    setTotalAmount(total);
  };

  const handleVisualize = () => {
    navigate("/dashboard");
  };

  // const handleVisualizeClick = () => {
  //   navigate("/dashboard");
  // };

  return (
    <div>
      <Header />
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={categoryDates[selectedCategory] || ""}
        onChange={handleDateChange}
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">-- Select Category --</option>
        <option value="Housing">Housing (Rent or Own)</option>
        <option value="Utilities">Utilities</option>
        <option value="Transportation">Transportation</option>
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Taxes">Taxes</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Miscellaneous">Miscellaneous</option>
        <option value="Clothing">Clothing</option>
        <option value="Insurance">Insurance</option>
        <option value="Debt Payment">Debt Payment</option>
      </select>

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={categoryDescriptions[selectedCategory] || ""}
        onChange={handleDescriptionChange}
      />

      <label htmlFor="amount">Amount:</label>
      <div className="amount-input-container">
        <span className="currency-symbol">$</span>
        <input
          type="number"
          id="amount"
          value={categoryAmounts[selectedCategory] || ""}
          onChange={handleAmountChange}
        />
      </div>
      <div className="button-container">
        <button className="small-button" onClick={handleAddExpense}>
          {selectedRow !== null ? "Update Expense" : "Add Expense"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((row, index) => (
            <tr key={index}>
              <td>{row.date.slice(0, 10)}</td>
              <td className="center-content">{row.category_name}</td>
              <td className="center-content">${row.amount}</td>
              <td className="center-content">{row.description}</td>

              <td>
                <div className="center-content">
                  {/* <button
                    className="small-button"
                    onClick={() => handleEditRow(index)}
                  >
                    Edit
                  </button>{" "} */}
                  <button
                    className="small-button"
                    onClick={() => handleDeleteRow(index, row.transaction_id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total Amount: ${totalAmount}</p>

      <div className="button-container">
        <button className="visualize-button" onClick={handleVisualize}>
          <div className="coin-stack"></div>
          Visualize
        </button>
      </div>

      {/* <button onClick={handleVisualizeClick}>Visualize</button> */}

      <Footer />
    </div>
  );
};
