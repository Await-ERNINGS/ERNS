import React, { useState, useEffect } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useNavigate } from "react-router-dom";
import "./Income.css";

export const Income = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [jobAmounts, setJobAmounts] = useState({});
  const [jobDescriptions, setJobDescriptions] = useState({});
  const [jobDates, setJobDates] = useState({});
  const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    updateTotalAmount();
  }, [tableData]);

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

  const handleAddIncome = () => {
    if (selectedJob.trim() !== "" && jobAmounts[selectedJob]) {
      const newTableRow = {
        date: jobDates[selectedJob] || "", // Use an empty string as fallback
        job: selectedJob,
        description: jobDescriptions[selectedJob],
        amount: parseFloat(jobAmounts[selectedJob]),
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
    const amounts = tableData.map((row) => parseFloat(row.amount));
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
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="center-content">{row.date}</td>
              <td className="center-content">{row.job}</td>
              <td className="center-content">${(row.amount).toFixed(2)}</td>
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
                  onClick={() => handleDeleteRow(index)}
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
