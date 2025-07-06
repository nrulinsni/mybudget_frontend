// components/Income/IncomeOverview.jsx
import React, { useEffect, useState } from 'react';
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="card-title text-primary">Income Overview</h2>
                        <p className="text-sm text-base-content/70 mt-1">
                            Track your earnings over time.
                        </p>
                    </div>
                     {/* Tombol dengan gaya minimalis */}
                    <button className="btn btn-ghost btn-sm text-primary" onClick={onAddIncome}>
                        <LuPlus />
                        Add Income
                    </button>
                </div>
                <CustomBarChart data={chartData} />
            </div>
        </div>
    );
}

export default IncomeOverview;