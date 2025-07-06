// components/Dashboard/ExpenseCategoryChart.jsx
import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

// Palet warna yang beragam
const THEME_COLORS = ["#0064D2", "#FFCE00", "#F26922", "#16a34a", "#dc2626", "#8b5cf6"];

const ExpenseCategoryChart = ({ data }) => {
  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <div className="card-body">
        <h2 className="card-title text-primary">Expense by Category</h2>
        
        {data && data.length > 0 ? (
          <div className="w-full h-80 mt-4">
            <CustomPieChart
                data={data}
                colors={THEME_COLORS}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50">
            No expense data to display chart.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCategoryChart;