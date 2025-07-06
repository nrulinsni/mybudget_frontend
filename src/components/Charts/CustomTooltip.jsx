// components/Charts/CustomTooltip.jsx
import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
    const formatToRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number || 0);
    };

    if (active && payload && payload.length) {
        // Ambil nama dari payload. 'name' untuk PieChart, 'category' untuk BarChart
        const name = payload[0].payload.name || payload[0].payload.category || label;
        const value = payload[0].value;

        return (
            <div className="bg-base-100/90 backdrop-blur-sm shadow-lg rounded-lg p-3 border border-base-300">
                <p className="text-sm font-semibold text-primary mb-1">{name}</p>
                <p className="text-base-content/80">
                    Amount: <span className="font-bold text-base-content">{formatToRupiah(value)}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;