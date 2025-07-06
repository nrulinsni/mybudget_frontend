import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Warna baru sesuai tema tiket.com
const TICKET_BLUE = "#0064D2";
const TICKET_YELLOW = "#FFCE00";

// Fungsi format Rupiah
const formatToRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number || 0);
};

const CustomBarChart = ({ data }) => {
  const getBarColor = (index) => (index % 2 === 0 ? TICKET_BLUE : TICKET_YELLOW);

  // Custom tooltip dengan tambahan "Source"
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { source, amount } = payload[0].payload;
      return (
        <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-lg p-3 border border-gray-200">
          <p className="text-xs font-semibold text-primary mb-2">{label}</p>
          {source && <p className="text-xs text-gray-600 capitalize">Source: <span className="font-medium">{source}</span></p>}
          <p className="text-sm text-gray-800">Amount: <span className="font-bold">{formatToRupiah(amount)}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="none" interval={0} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="none" tickFormatter={(value) => new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(value)} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 100, 210, 0.1)' }} />
          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;