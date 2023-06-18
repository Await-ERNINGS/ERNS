import React, { useState, useEffect } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useNavigate } from "react-router-dom";
import "./Income.css";
import axios from "axios";

export const Income = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [jobAmounts, setJobAmounts] = useState({});
  const [jobDescriptions, setJobDescriptions] = useState({});
  const [jobDates, setJobDates] = useState({});
  const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/income_transactions"
        );
        setIncomes(response.data);
        console.log(response.data);
        setIncomes(response.data);
        // const res = await fetch("http://localhost:5000/expense_transactions");
        // console.log(typeof res);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };
    fetchIncome();
    updateTotalAmount();
  }, []);

  const navigate = useNavigate();

  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };

  const handleAmountChange = (event) => {
    const amount = event.target.value;
    setJobAmounts((prevJobAmounts) => ({
      ...prevJobAmounts,
      [selectedJob]: amount,
    }));
  };

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    setJobDescriptions((prevJobDescriptions) => ({
      ...prevJobDescriptions,
      [selectedJob]: description,
    }));
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setJobDates((prevJobDates) => ({
      ...prevJobDates,
      [selectedJob]: date,
    }));
  };

  const handleAddIncome = async () => {
    if (selectedJob.trim() !== "" && jobAmounts[selectedJob]) {
      const newIncome = {
        date: jobDates[selectedJob] || "", // Use an empty string as fallback
        category_name: selectedJob,
        description: jobDescriptions[selectedJob],
        amount: parseFloat(jobAmounts[selectedJob]),
        type: "income",
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/add_transaction/",
          newIncome
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      const updatedIncome = [...incomes];
      updatedIncome.push(newIncome);
      setIncomes(updatedIncome);
    }
  };

  const handleDeleteRow = async (index, transaction_id) => {
    try {
      await axios.delete(
        `http://localhost:5000/delete_transaction/${transaction_id}`
      );
    } catch (error) {
      console.log(error);
    }

    const updatedIncome = [...incomes];
    updatedIncome.splice(index, 1);
    setIncomes(updatedIncome);
  };

  const handleEditRow = (index) => {
    const selectedRowData = tableData[index];
    setSelectedJob(selectedRowData.job);
    setJobAmounts((prevJobAmounts) => ({
      ...prevJobAmounts,
      [selectedRowData.job]: selectedRowData.amount,
    }));
    setJobDescriptions((prevJobDescriptions) => ({
      ...prevJobDescriptions,
      [selectedRowData.job]: selectedRowData.description,
    }));
    setJobDates((prevJobDates) => ({
      ...prevJobDates,
      [selectedRowData.job]: selectedRowData.date,
    }));
    setSelectedRow(index);
  };

  const updateTotalAmount = () => {
    const amounts = incomes.map((row) => parseFloat(row.amount));
    const total = amounts.reduce((acc, cur) => acc + cur, 0);
    setTotalAmount(total);
  };

  const handleVisualize = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <Header />
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={jobDates[selectedJob] || ""}
        onChange={handleDateChange}
      />

      <label htmlFor="job">Job:</label>
      <select id="job" value={selectedJob} onChange={handleJobChange}>
        <option value="">-- Select Job --</option>
        <option value="Employment Income">Employment Income</option>
        <option value="Self-Employment">Self-Employment</option>
        <option value="Rental Income">Rental Income</option>
        <option value="Investment Income">Investment Income</option>
        <option value="Royalties">Royalties</option>
        <option value="Retirement Income">Retirement Income</option>
        <option value="Dividends">Dividends</option>
        <option value="Gifts and Inheritances">Gifts and Inheritances</option>
        <option value="Other">Other</option>
        <option value="Government Assistance">Government Assistance</option>
      </select>

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={jobDescriptions[selectedJob] || ""}
        onChange={handleDescriptionChange}
      />

      <label htmlFor="amount">Amount:</label>
      <div className="amount-input-container">
        <span className="currency-symbol">$</span>
        <input
          type="number"
          id="amount"
          value={jobAmounts[selectedJob] || ""}
          onChange={handleAmountChange}
        />
      </div>

      <div className="button-container">
        <button className="small-button" onClick={handleAddIncome}>
          {selectedRow !== null ? "Update Income" : "Add Income"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Job</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((row, index) => (
            <tr key={index}>
              <td className="center-content">{row.date.slice(0, 10)}</td>
              <td className="center-content">{row.category_name}</td>
              <td className="center-content">${row.amount}</td>
              <td className="center-content">{row.description}</td>
              <td>
                <div className="center-content">
                  <button
                    className="small-button"
                    onClick={() => handleEditRow(index)}
                  >
                    Edit
                  </button>{" "}
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

      <p>Total Amount: ${totalAmount.toFixed(2)}</p>

      <div className="button-container">
        <button className="visualize-button" onClick={handleVisualize}>
          <div className="coin-stack"></div>
          Visualize
        </button>
      </div>
      {/* <span class="money"></span> */}

      <Footer />
    </div>
  );
};
