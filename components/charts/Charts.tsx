
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import type { Student, SchoolData } from '../../types';

interface AttendanceChartProps {
  data: Student['attendance'];
}

export const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis domain={[60, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="percentage" fill="#8884d8" name="Посещаемость" />
    </BarChart>
  </ResponsiveContainer>
);

interface GradesChartProps {
    data: Student['grades'];
}

export const GradesChart: React.FC<GradesChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 5]} />
        <YAxis type="category" dataKey="subject" width={80} />
        <Tooltip />
        <Legend />
        <Bar dataKey="grade" fill="#82ca9d" name="Средний балл" />
      </BarChart>
    </ResponsiveContainer>
);

interface RiskDistributionPieChartProps {
    data: SchoolData['riskDistribution'];
}
const COLORS = { 'Низкий': '#10B981', 'Средний': '#F59E0B', 'Высокий': '#EF4444' };

export const RiskDistributionPieChart: React.FC<RiskDistributionPieChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
);


interface RiskDynamicsChartProps {
    data: SchoolData['riskDynamics'];
}

export const RiskDynamicsChart: React.FC<RiskDynamicsChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="highRiskCount" name="Высокий риск" stroke="#EF4444" strokeWidth={2} />
            <Line type="monotone" dataKey="mediumRiskCount" name="Средний риск" stroke="#F59E0B" strokeWidth={2} />
        </LineChart>
    </ResponsiveContainer>
);
