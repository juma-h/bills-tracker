
"use client"
import React, { useState } from "react";
import Example from "../components/PieChart";
import TableData from "../components/TableFormat";

export default function Home() {
  const [visualization, setVisualization] = useState("charts");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full flex flex-col items-center lg:flex-row lg:justify-between font-mono text-sm">
        <div className="lg:w-1/2 lg:text-center">
          <h1 className="text-2xl font-bold mb-4">Finance Bill Data</h1>
        </div>

        <div className="max-w-sm mx-auto lg:mx-0 lg:w-1/2 mb-4 lg:mb-0">
          <form className="lg:text-right">
            <select
              id="visualization"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={visualization}
              onChange={(e) => setVisualization(e.target.value)}
            >
              <option value="charts">Charts</option>
              <option value="table">Table</option>
            </select>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-3/4 mx-auto mt-[1em]">
        {visualization === "charts" && <Example />}
        {visualization === "table" && <TableData />}
      </div>
    </main>
  );
}
