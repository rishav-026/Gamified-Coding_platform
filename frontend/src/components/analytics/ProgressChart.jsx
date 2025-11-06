import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const ProgressChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <h3 className="text-xl font-bold mb-4">Progress Over Time</h3>
        <p className="text-gray-500 text-center py-12">No data available yet.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">Progress Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="quests"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ fill: '#0ea5e9', r: 4 }}
            activeDot={{ r: 6 }}
            name="Quests Completed"
          />
          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Tasks Completed"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ProgressChart;
