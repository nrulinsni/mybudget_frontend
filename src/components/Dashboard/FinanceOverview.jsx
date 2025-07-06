import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

// Warna Biru (Primary) dan Kuning (Secondary)
const THEME_COLORS = ["#0064D2", "#FFCE00"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {

  const parseRupiah = (rupiahStr) => {
    if (typeof rupiahStr !== 'string') return Number(rupiahStr) || 0;
    return Number(rupiahStr.replace(/[^0-9]/g, '')) || 0;
  };

  const chartData = [
    { name: "Income", amount: parseRupiah(totalIncome), color: THEME_COLORS[0] },
    { name: "Expenses", amount: parseRupiah(totalExpenses), color: THEME_COLORS[1] },
  ];

  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <div className="card-body items-center">
        <h2 className="card-title text-primary self-start">Financial Overview</h2>
        
        <div className="text-center my-2">
            <div className="text-sm text-base-content/70">Total Balance</div>
            <div className="text-4xl font-bold text-base-content">{totalBalance}</div>
        </div>
        
        <div className="w-full h-64 mt-2">
            {(chartData[0].amount > 0 || chartData[1].amount > 0) ? (
                <CustomPieChart
                    data={chartData}
                    colors={THEME_COLORS}
                />
            ) : (
                <div className="flex items-center justify-center h-full text-base-content/50">
                    No data for chart.
                </div>
            )}
        </div>

        {/* === INI BAGIAN LEGEND YANG HILANG === */}
        <div className="flex justify-center items-center gap-x-6 gap-y-2 mt-4 w-full">
          {chartData.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-sm text-base-content/80">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;