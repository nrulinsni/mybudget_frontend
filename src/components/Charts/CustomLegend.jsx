import React from 'react';

// Nama komponen harusnya CustomLegend
const CustomLegend = ({ payload }) => {
  // payload adalah array yang dikirim oleh Recharts
  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-base-content/80">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;