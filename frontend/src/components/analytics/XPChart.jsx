import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const XPChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <h3 className="text-xl font-bold mb-4">XP Growth</h3>
        <p className="text-gray-500 text-center py-12">No data available yet.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">XP Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorXP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="xp"
            stroke="#0ea5e9"
            fillOpacity={1}
            fill="url(#colorXP)"
            name="Total XP"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default XPChart;
