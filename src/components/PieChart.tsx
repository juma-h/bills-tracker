"use client"
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import votesData2023 from "../json-data/csv.json";
import votesData2024 from "../json-data/fb24.json";

interface VoteData {
    name: string;
    vote: string;
}

const PieChartComponent: React.FC = () => {
    const [data, setData] = useState<VoteData[]>([]);
    const [year, setYear] = useState<string>('2023');

    // Function to normalize data to the required structure
    const normalizeData = (rawData: any[]): VoteData[] => {
        return rawData.map(item => ({
            name: item.MP,
            vote: item.vote
        }));
    };

    // Function to fetch data based on the selected year
    const fetchData = (year: string) => {
        let rawData: any[] = [];
        if (year === '2023') {
            rawData = votesData2023;
        } else if (year === '2024') {
            rawData = votesData2024;
        }
        const normalizedData = normalizeData(rawData);
        setData(normalizedData);
    };

    useEffect(() => {
        fetchData(year);
    }, [year]);

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
    const COLORS = ['#D1ED8D', '#FF0000', '#FFA500'];

    return  (
        <div style={{ width: '100%', height: '600px', textAlign: 'center' }}>
            <div className='w-1/4'>
                <label htmlFor="year-select mb-4">Select Year: </label>
                <select
                    id="year-select"
                     className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select>
            </div>
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
