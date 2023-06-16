import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../Header";
import { Footer } from "../Footer";
import "./Expense.css";

export const Expense = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryAmounts, setCategoryAmounts] = useState({});
  const [categoryDescriptions, setCategoryDescriptions] = useState({});
  const [categoryDates, setCategoryDates] = useState({});
  const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    updateTotalAmount();
  }, [tableData]);

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

  const handleAddExpense = () => {
    if (selectedCategory.trim() !== "" && categoryAmounts[selectedCategory]) {
      const newTableRow = {
        date: categoryDates[selectedCategory],
        category: selectedCategory,
        amount: categoryAmounts[selectedCategory],
        description: categoryDescriptions[selectedCategory],
      };
      setTableData((prevTableData) => [...prevTableData, newTableRow]);
    }
  };

  const updateTotalAmount = () => {
    const amounts = tableData.map((row) => parseFloat(row.amount));
    const total = amounts.reduce((acc, cur) => acc + cur, 0);
    setTotalAmount(total);
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
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        {/* Add more categories as needed */}
      </select>

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={categoryDescriptions[selectedCategory] || ""}
        onChange={handleDescriptionChange}
      />

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={categoryAmounts[selectedCategory] || ""}
        onChange={handleAmountChange}
      />

      <button onClick={handleAddExpense}>Add Expense</button>

      <table>
        <thead>
          <tr>
           
          <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.category}</td>
              <td>{row.amount}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total Amount: {totalAmount}</p>

      {/* <button onClick={handleVisualizeClick}>Visualize</button> */}
    
      <Footer />
    </div>
  );
};
