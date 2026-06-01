import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts'

export default function AppBarChart({ data, XaxisData, color, name,barDatakey }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis dataKey={XaxisData} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={barDatakey} fill={color} name={name} />
            </BarChart>
        </ResponsiveContainer>
    )
}
