import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
// Kita tidak perlu CustomLegend lagi di sini

const CustomPieChart = ({ data, colors }) => { // Hapus prop yang tidak perlu
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="90%"
                    paddingAngle={2}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                {/* Baris Legend dihapus dari sini */}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;