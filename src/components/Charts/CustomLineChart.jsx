// components/Charts/CustomLineChart.jsx
import React from 'react';
import moment from 'moment';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

const TICKET_BLUE = "#0064D2";

const formatToRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number || 0);
};

const CustomLineChart = ({ data }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const { category, amount } = payload[0].payload;
            return (
                <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-primary mb-2">{moment(label).format("DD MMM YYYY")}</p>
                    {category && <p className="text-xs text-gray-600 capitalize">Category: <span className="font-medium">{category}</span></p>}
                    <p className="text-sm text-gray-800">Amount: <span className="font-bold">{formatToRupiah(amount)}</span></p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={TICKET_BLUE} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={TICKET_BLUE} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickFormatter={(date) => moment(date).format("DD MMM")}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        stroke="none"
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        stroke="none"
                        tickFormatter={(value) => new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(value)}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 100, 210, 0.1)' }}/>
                    <Area type="monotone" dataKey="amount" stroke={TICKET_BLUE} fill="url(#expenseGradient)" strokeWidth={2.5} dot={{ r: 4, fill: TICKET_BLUE }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomLineChart;