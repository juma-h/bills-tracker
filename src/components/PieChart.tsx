"use client"
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import votesData from "../json-data/csv.json";

interface VoteData {
    name: string;
    vote: string;
}

const PieChartComponent: React.FC = () => {
    const [data, setData] = useState<VoteData[]>([]);

    // Example JSON data (replace with your actual data)
    const fetchData = () => {
        // Simulating fetching data from an API or local source
        const jsonData: VoteData[] = votesData;
        setData(jsonData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Function to calculate counts of YES, NO, and ABSENT votes
    const calculateVoteCounts = () => {
        let yesCount = 0;
        let noCount = 0;
        let absentCount = 0;

        data.forEach((item) => {
            switch (item.vote) {
                case 'YES':
                    yesCount++;
                    break;
                case 'NO':
                    noCount++;
                    break;
                case 'ABSENT':
                    absentCount++;
                    break;
                default:
                    break;
            }
        });

        return [
            { name: 'YES', value: yesCount },
            { name: 'NO', value: noCount },
            { name: 'ABSENT', value: absentCount },
        ];
    };

    const pieChartData = calculateVoteCounts();

    // Define colors for the pie chart sectors
    const COLORS = ['#D1ED8D', '#FF0000', '#004E84'];

    return (
        <div style={{ width: '100%', height: '600px', textAlign: 'center' }}>
            <h2 className='text-center font-semibold'>Finance Bill 2023 Votes</h2>
            <ResponsiveContainer width="90%" height="80%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        fill="#8884d8"
                        paddingAngle={5}
                        label
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={50} />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;

