import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
<<<<<<< HEAD

=======
>>>>>>> 58ecff055e49470263a3097e9757fe221fcbc07a
import "./Expense.css";

export const Expense = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryAmounts, setCategoryAmounts] = useState({});
  const [categoryDescriptions, setCategoryDescriptions] = useState({});
  const [categoryDates, setCategoryDates] = useState({});
  const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    updateTotalAmount();
  }, [tableData]);

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

  const handleAddExpense = () => {
    if (selectedCategory.trim() !== "" && categoryAmounts[selectedCategory]) {
      const newTableRow = {
        date: categoryDates[selectedCategory] || "",
        category: selectedCategory,
        amount: parseFloat(categoryAmounts[selectedCategory]), // Parse amount as a number
        description: categoryDescriptions[selectedCategory],
      };
      if (selectedRow !== null) {
        const updatedTableData = [...tableData];
        updatedTableData[selectedRow] = newTableRow;
        setTableData(updatedTableData);
        setSelectedRow(null);
      } else {
        setTableData((prevTableData) => [...prevTableData, newTableRow]);
      }
    }
  };
  
  const handleDeleteRow = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
    setSelectedRow(null);
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
    const amounts = tableData.map((row) => parseFloat(row.amount));
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
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.category}</td>
              <td>{(row.amount).toFixed(2)}</td>
              <td>{row.description}</td>
              <td>
                <button
                  className="small-button"
                  onClick={() => handleEditRow(index)}
                >
                  Edit
                </button>{" "}
                
                <button
                  className="small-button"
                  onClick={() => handleDeleteRow(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total Amount: ${totalAmount.toFixed(2)}</p>

      <div className="button-container">
        <button className="small-button" onClick={handleVisualize}>
          Visualize
        </button>
      </div>

      {/* <button onClick={handleVisualizeClick}>Visualize</button> */}

      <Footer />
    </div>
  );
};
