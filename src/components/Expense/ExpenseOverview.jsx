import React, { useState, useEffect } from 'react';
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="card-title text-primary">Expense Overview</h2>
            <p className="text-sm text-base-content/70 mt-1">
              Track your spending over time.
            </p>
          </div>
          {/* Mengubah gaya tombol agar konsisten */}
          <button className="btn btn-ghost btn-sm text-primary" onClick={onAddExpense}>
            <LuPlus />
            Add Expense
          </button>
        </div>
        <div className="mt-10">
          <CustomLineChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseOverview;